import { app, dialog } from 'electron'
import fs, { mkdirSync, existsSync } from 'fs'
import { copy } from 'fs-extra'
import { join, resolve, basename } from 'path'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import pify from 'pify'
import mm from 'musicmetadata'
import getDB from '../schemas'

import {
  __initFirstBoot,
  __initBoot
} from '../../common/reducers/settings'

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
  createBlacklistFilter('library', ['activeAudioFile'])
]

export const openDialog = async () => {
  // cleanup dialog properties for appropriate file extensions
  const asyncShowOpenDialog = pify(dialog.showOpenDialog, {errorFirst: false})
  try {
    const [filename] = await asyncShowOpenDialog({
      properties: ['openFile'],
      filters: [
        {name: 'Audio', extensions: ['mp3']},
        {name: 'All Files', extensions: ['*']}
      ]
    })
    return filename
  } catch (e) {
    throw new Error(e)
  }
}

export const getFileName = path => basename(path)

export const extractMetaData = async filePath => {
  const mmAsync = pify(mm)
  const stream = fs.createReadStream(filePath)
  try {
    const metadata = await mmAsync(stream)
    stream.close()
    return metadata
  } catch (e) {
    return e
  }
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

export const addTrackToDB = async ({ author, bookName, trackNum, title }, fileName) => {
  console.log(
    author,
    bookName,
    trackNum,
    title,
    fileName
  )
  const db = await getDB()
  const trackCollection = db.collections.track
  const bookCollection = db.collections.book
  console.log('got collection')
  console.log('enter try catch')
  let book = await bookCollection
    .findOne()
    .where('bookName')
    .eq(bookName)
    .exec()
  let track = await trackCollection.findOne({
    title: {$eq: title}
  }).exec()
  console.log('got documents')
  console.log('track', track)
  debugger // eslint-disable-line no-debugger
  if (track) throw new Error('Track Exists in library')
  if (!book) {
    book = await bookCollection.insert({
      author,
      bookName,
      trackIds: []
    })
  }
  let bookTrackIds = book.trackIds
  if (!bookTrackIds) bookTrackIds = []
  track = await trackCollection.insert({
    fileName,
    author,
    bookName,
    title,
    trackNum
  })
  console.log('insertion complete')
  bookTrackIds.push(track._id)
  await book.set('trackIds', bookTrackIds)
  console.log('id', book.trackIds)
  // await db.collections.book.insert({
  //   author,
  //   title: bookName
  // })
}
