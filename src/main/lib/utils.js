import { app } from 'electron'
import fs from 'fs'
import { join } from 'path'

import {
  __initFirstBoot,
  __initBoot
} from '../../common/reducers/settings'

export const getHomeDir = () => app.getPath('home')

export const createLibararyLocation = dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
}

export const initBoot = ({ dispatch }, isFirstLoad) =>
  isFirstLoad
    ? dispatch(__initFirstBoot())
    : dispatch(__initBoot())

export const joinPath = paths => join(...paths)
