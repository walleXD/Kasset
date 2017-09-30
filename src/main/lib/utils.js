import { app, dialog } from 'electron'
import fs, { mkdirSync, existsSync, lstatSync, readdir } from 'fs'
import { copy } from 'fs-extra'
import { join, resolve, basename } from 'path'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import pify from 'pify'
import mm from 'musicmetadata'
import readChunk from 'read-chunk'
import fileType from 'file-type'
import hashGenerator from 'md5-file/promise'

import getDB from '../schemas'
import {
  __initFirstBoot,
  __initBoot
} from '../../common/actions/settings'

const APPROVED_FILE_TYPES = ['mp3', 'm4a', 'm4b']

export const getHomeDir = () => app.getPath('home')

export const createLibararyLocation = dir => {
  if (!existsSync(dir)) mkdirSync(dir)
}

export const initBoot = ({ dispatch, getState }) =>
  getState().settings.firstLoad
    ? dispatch(__initFirstBoot())
    : dispatch(__initBoot())

export const joinPath = paths => join(...paths)

export const blackListFilters = () => [
  createBlacklistFilter('example', ['score']),
  createBlacklistFilter('library', ['activeAudioFile']),
  createBlacklistFilter('libraryView', ['books', 'loading'])
]

// library helpers
export const openDialog = async ({ openDirectory } = { openDirectory: false }) => {
  const asyncShowOpenDialog = pify(dialog.showOpenDialog, {errorFirst: false})
  const properties = openDirectory
    ? ['openDirectory']
    : ['openFile']
  console.log(properties)
  try {
    const [filename] = await asyncShowOpenDialog({
      properties,
      title: 'Add Track to Library',
      filters: [
        {name: 'Audio', extensions: ['mp3', 'm4a']},
        {name: 'All Files', extensions: ['*']}
      ]
    })
    return filename
  } catch (e) {
    return null
  }
}

export const getFileName = path => basename(path)

export const isFile = path => lstatSync(path).isFile()

export const filesInDir = async dir => {
  const readdirAsync = pify(readdir)
  return readdirAsync(dir)
}

export const isValidFileType = async filepath => {
  const fileBuffer = await readChunk(filepath, 0, 4100)
  const filetype = await fileType(fileBuffer)
  const {ext} = filetype
  return APPROVED_FILE_TYPES.includes(ext)
}

export const extractMetaData = async filePath => {
  const mmAsync = pify(mm)
  const isValid = await isValidFileType(filePath)
  if (!isValid) throw new Error('Unsupported format')

  const stream = fs.createReadStream(filePath)
  const metadata = await mmAsync(stream)
  stream.close()

  return metadata
}

export const createBookFolder = (artist, album, libraryDir) => {
  const artistDir = resolve(libraryDir, artist)
  const albumDir = resolve(libraryDir, artist, album)

  const artistDirExists = existsSync(artistDir)
  const albumDirExists = existsSync(albumDir)

  if (albumDirExists) return albumDir
  if (!artistDirExists) {
    mkdirSync(artistDir)
  }
  mkdirSync(albumDir)

  return albumDir
}

export const copyAudioFile = async (src, dest, filename) => {
  try {
    await copy(src, join(dest, filename))
  } catch (e) {
    console.error(e)
  }
}

export const addTrackToDB = async (
  { originalPath, author, bookName, trackNum, title },
  fileName
) => {
  const db = await getDB()

  const trackCollection = db.collections.track
  const bookCollection = db.collections.book
  const authorCollection = db.collections.author
  const trackHash = await hashGenerator(originalPath)

  let book = await bookCollection
    .findOne()
    .where('bookName')
    .eq(bookName)
    .exec()
  let track = await trackCollection
    .findOne()
    .where('hash')
    .eq(trackHash)
    .exec()
  let authorDoc = await authorCollection
    .findOne()
    .where('name')
    .eq(author)
    .exec()

  if (track) throw new Error('Track Exists in library')

  if (!book) {
    book = await bookCollection.insert({
      author,
      bookName,
      trackIds: []
    })
  }

  if (!authorDoc) {
    authorDoc = await authorCollection.insert({
      name: author[0],
      authorBookIds: []
    })
  }

  const authorBookIds = authorDoc.authorBookIds
  authorBookIds.push(book._id)
  authorDoc.authorBookIds = authorBookIds
  await authorDoc.save()

  track = await trackCollection.insert({
    hash: trackHash,
    fileName,
    author,
    bookName,
    title,
    trackNum
  })
  const trackIds = book.trackIds
  trackIds.push(track.hash)
  book.trackIds = trackIds

  await book.save()
}

export const loadAllBooks = async () => {
  const db = await getDB()

  const bookCollection = db.collections.book
  const booksDocs = await bookCollection
    .find({
      sort: ['bookName']
    })
    .exec()

  const books = []
  booksDocs.forEach(doc => {
    const { _id, author, bookName, trackIds } = doc
    books.push({ _id, author, bookName, trackIds })
  })

  return books
}
