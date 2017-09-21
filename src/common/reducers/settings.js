import { createAction, handleActions } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import { getHomeDir, createLibararyLocation, joinPath } from '../../main/lib/utils'

const INITIAL_STATE = {
  homeDir: '',
  libraryFolder: 'Kasset',
  libraryDir: '',
  libraryLocation: '',
  libraryInHome: true,
  firstLoad: true
}

export const __setHomeDir = createAction(
  'settings/SET_HOME_DIR',
  () => getHomeDir()
)

export const _setHomeDir = createAliasedAction(
  'settings/SET_HOME_DIR',
  __setHomeDir
)

export const updateLibraryLocation = createAction(
  'settings/UPDATE_LIBRARY_LOCATION'
)

export const __createLibraryLocation = createAction(
  'settings/CREATE_LIBRARY_LOCATION',
  () => (dispatch, getState) => {
    const { libraryLocation } = getState().settings
    createLibararyLocation(libraryLocation)
    return dispatch(__completedFirstBoot())
  }
)

export const __completedFirstBoot = createAction(
  'settings/COMPLETED_FIRST_BOOT'
)

export const __initFirstBoot = createAction(
  'settings/INIT_FIRST_BOOT',
  () => dispatch => {
    dispatch(__setHomeDir())
    dispatch(updateLibraryLocation())
    dispatch(__createLibraryLocation())
  }
)

export const __initBoot = createAction(
  'settings/INIT_BOOT'
)

export default handleActions({
  [__setHomeDir]: (state, { payload }) => ({
    ...state, homeDir: payload
  }),
  [__completedFirstBoot]: state => ({
    ...state, firstLoad: false
  }),
  [updateLibraryLocation] (state) {
    if (state.libraryInHome) {
      const libraryLocation = joinPath([state.homeDir, state.libraryFolder])
      return { ...state, libraryLocation }
    }
    return { ...state, libraryLocation: `${state.libraryLocation}/${state.libraryFolder}` }
  }
}, INITIAL_STATE)
