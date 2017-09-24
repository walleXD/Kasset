import { app, dialog } from 'electron'
import fs, { mkdirSync, existsSync } from 'fs'
import { copy } from 'fs-extra'
import { join, resolve, basename } from 'path'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import pify from 'pify'
import mm from 'musicmetadata'

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
