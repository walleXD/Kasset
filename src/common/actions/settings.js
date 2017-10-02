import { createAction } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import { getHomeDir, createLibararyLocation } from '../../main/lib/utils'
import { initDb } from '../../main/schemas'
import { __getAllBooks, clearActiveBooktracks } from './libraryView'

export const __setHomeDir = createAction(
  'settings/SET_HOME_DIR',
  () => getHomeDir()
)

export const $setHomeDir = createAliasedAction(
  'settings/SET_HOME_DIR',
  () => __setHomeDir()
)

export const updateLibraryLocation = createAction(
  'settings/UPDATE_LIBRARY_LOCATION'
)

export const __updateDbLocation = createAction(
  'settings/UPDATE_DB_LOCATION'
)

export const __createLibraryLocation = createAction(
  'settings/CREATE_LIBRARY_LOCATION',
  () => async (dispatch, getState) => {
    const { libraryLocation } = getState().settings
    createLibararyLocation(libraryLocation)
    dispatch(__updateDbLocation())
    dispatch(__initDB())
    dispatch(__completedFirstBoot())
  }
)

export const __initDB = createAction(
  'settings/INIT_DB',
  () => (dispatch, getState) =>
    initDb(getState().settings.dbLocation)
)

export const __completedFirstBoot = createAction(
  'settings/COMPLETED_FIRST_BOOT'
)

export const __initFirstBoot = createAction(
  'settings/INIT_FIRST_BOOT',
  () => dispatch => {
    dispatch(__setHomeDir())
    dispatch(updateLibraryLocation())
    dispatch(clearActiveBooktracks())
    dispatch(__createLibraryLocation())
  }
)

export const __initBoot = createAction(
  'settings/INIT_BOOT',
  () => async (dispatch, getState) => {
    const { dbLocation } = getState().settings
    console.log('loc', dbLocation)
    // dispatch(__initDB())
    await dispatch(__getAllBooks())
    dispatch(clearActiveBooktracks())
    dispatch(__completedBoot())
  }
)

export const __completedBoot = createAction(
  'settings/COMPLETED_BOOT'
)
