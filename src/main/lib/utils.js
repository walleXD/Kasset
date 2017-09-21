import { app } from 'electron'
import fs from 'fs'

import {
  __setHomeDir,
  __createLibraryLocation,
  updateLibraryLocation
} from '../../common/reducers/settings'

export const getHomeDir = () => app.getPath('home')

export const createLibararyLocation = dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
}

export const setDefaultSettings = store => {
  store.dispatch(__setHomeDir())
  store.dispatch(updateLibraryLocation())
  store.dispatch(__createLibraryLocation())
}
