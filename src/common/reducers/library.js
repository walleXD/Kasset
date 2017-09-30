import { handleActions } from 'redux-actions'

import {
  __setActiveAudioFile,
  __setMetadataForActive,
  __setBookLibraryDir,
  __errorHandler,
  __clearActiveAudioFile
} from '../actions/library'

const INITIAL_STATE = {
  activeAudioFile: {
    fileName: '',
    originalPath: '',
    metadata: {
      artist: [],
      track: {},
      album: '',
      title: ''
    },
    newLibraryDir: '',
    error: ''
  }
}

export default handleActions({
  [__setActiveAudioFile]: (state, { payload }) => ({
    ...state, activeAudioFile: { ...payload }
  }),
  [__setMetadataForActive]: (state, { payload }) => ({
    ...state,
    activeAudioFile: {
      ...state.activeAudioFile,
      metadata: payload
    }
  }),
  [__setBookLibraryDir]: (state, { payload }) => ({
    ...state,
    activeAudioFile: {
      ...state.activeAudioFile,
      newLibraryDir: payload
    }
  }),
  [__errorHandler]: (state, { payload }) => ({
    ...state,
    activeAudioFile: {
      ...state.activeAudioFile,
      error: payload
    }
  }),
  [__clearActiveAudioFile]: state => ({
    ...state, activeAudioFile: INITIAL_STATE.activeAudioFile
  })
}, INITIAL_STATE)
