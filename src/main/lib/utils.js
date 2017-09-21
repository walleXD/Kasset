import { app } from 'electron'
import {
  __completedFirstBoot,
  __setHomeDir,
  updateLibraryLocation
} from '../../common/reducers/settings'

export const getHomeDir = () => app.getPath('home')

export const setDefaultSettings = store => {
  store.dispatch(__setHomeDir())
  store.dispatch(updateLibraryLocation())
  store.dispatch(__completedFirstBoot())
}
