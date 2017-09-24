import { app, dialog } from 'electron'
import fs from 'fs'
import { join } from 'path'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import pify from 'pify'
import mm from 'musicmetadata'

import {
  __initFirstBoot,
  __initBoot
} from '../../common/reducers/settings'

export const getHomeDir = () => app.getPath('home')

export const createLibararyLocation = dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
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
