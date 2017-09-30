import { handleActions } from 'redux-actions'

import {
  __setHomeDir,
  __completedFirstBoot,
  updateLibraryLocation,
  __updateDbLocation
} from '../actions/settings'

const INITIAL_STATE = {
  homeDir: '',
  libraryFolder: 'Kasset',
  libraryDir: '',
  libraryLocation: '',
  libraryInHome: true,
  firstLoad: true,
  dbFolder: 'db',
  dbLocation: ''
}

export default handleActions({
  [__setHomeDir]: (state, { payload }) => ({
    ...state, homeDir: payload
  }),
  [__completedFirstBoot]: state => ({
    ...state, firstLoad: false
  }),
  [updateLibraryLocation] (state) {
    if (state.libraryInHome) {
      const libraryLocation = `${state.homeDir}/${state.libraryFolder}`
      return { ...state, libraryLocation }
    }
    return { ...state, libraryLocation: `${state.libraryLocation}/${state.libraryFolder}` }
  },
  [__updateDbLocation] (state) {
    // TODO: set proper directory handling once ready for use
    return { ...state, dbLocation: '/tmp/db' }
  }
}, INITIAL_STATE)
