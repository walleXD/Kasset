import { createAction, handleActions } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import {
  copyAudioFile,
  openDialog,
  extractMetaData,
  createBookFolder,
  getFileName,
  addTrackToDB
} from '../../main/lib/utils'

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

export const __openDialog = createAction(
  'library/OPEN_DIALOG',
  () => async dispatch => {
    try {
      const originalPath = await openDialog()
      if (!originalPath) return null
      const fileName = getFileName(originalPath)
      dispatch(__setActiveAudioFile({
        originalPath,
        fileName
      }))
      await dispatch(__extractMetadataFromActive())
      await (dispatch(__addTrackToDB()))
      dispatch(__createBookFolders())
      await dispatch(__copyAudioFileToLibrary())
    } catch (e) {
      console.log(e)
      dispatch(__clearActiveAudioFile())
      dispatch(__errorHandler(e.message))
    }
  }
)
const __errorHandler = createAction(
  'library/ERROR_HANDLER'
)

const __setActiveAudioFile = createAction(
  'library/SET_ACTIVE_AUDIO_FILE'
)

const __extractMetadataFromActive = createAction(
  'library/EXTRACT_METADATA_FROM_ACTIVE',
  () => async (dispatch, getState) => {
    const { originalPath } = getState().library.activeAudioFile
    const { title, artist, album, track, year } = await extractMetaData(originalPath)
    console.log(await extractMetaData(originalPath))
    dispatch(__setMetadataForActive({
      artist,
      track,
      album,
      title,
      year
    }))
  }
)

const __createBookFolders = createAction(
  'library/CREATE_BOOK_FOLDERS',
  () => (dispatch, getState) => {
    const { libraryLocation } = getState().settings
    const { artist, album } = getState().library.activeAudioFile.metadata
    dispatch(__setBookLibraryDir(
      createBookFolder(artist[0], album, libraryLocation)
    ))
  }
)

const __copyAudioFileToLibrary = createAction(
  'library/COPY_AUDIO_FILE_TO_LIBRARY',
  () => async (dispatch, getState) => {
    const {
      originalPath,
      newLibraryDir,
      fileName
    } = getState().library.activeAudioFile
    await copyAudioFile(originalPath, newLibraryDir, fileName)
  }
)

const __addTrackToDB = createAction(
  'library/ADD_TRACK_TO_DB',
  () => async (dispatch, getState) => {
    const {
      fileName,
      metadata: { artist, album, track, title }
    } = getState().library.activeAudioFile
    await addTrackToDB({
      author: artist,
      bookName: album,
      trackNum: track,
      title
    }, fileName)
  }
)

const __setBookLibraryDir = createAction(
  'library/SET_BOOK_LIBRARY_DIR'
)

const __setMetadataForActive = createAction(
  'library/SET_METADATA_FOR_ACTIVE'
)

const __clearActiveAudioFile = createAction(
  'library/CLEAR_ACTIVE_AUDIO_FILE'
)

export const $openDialog = createAliasedAction(
  'library/OPEN_DIALOG',
  () => __openDialog()
)

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
