import { createAction, handleActions } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import {
  copyAudioFile,
  openDialog,
  extractMetaData,
  createBookFolder,
  getFileName,
  addTrackToDB,
  isFile,
  joinPath,
  filesInDir
} from '../../main/lib/utils'

import { __getAllBooks } from './libraryView'

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
  payload => async dispatch => {
    const input = await openDialog(payload)
    if (!input) return null
    console.log(input)
    await dispatch(__processSelection(input))
    dispatch(__getAllBooks())
  }
)

const __processSelection = createAction(
  'library/PROCESS_SELECTION',
  input => async dispatch =>
    isFile(input)
      ? dispatch(__processAudioFile(input))
      : dispatch(__processFolder(input))
)

const __processFolder = createAction(
  'library/PROCESS_FOLDER',
  folderPath => async dispatch => {
    console.log('folder path', folderPath)
    const files = await filesInDir(folderPath)
    const filePaths = files.map(file => joinPath([folderPath, file]))
    console.log(filePaths)
    for (let i = 0; i < filePaths.length; i++) {
      await dispatch(__processSelection(filePaths[i]))
    }
  }
)

const __processAudioFile = createAction(
  'library/PROCESS_AUDIO_FILE',
  originalPath => async dispatch => {
    const fileName = getFileName(originalPath)
    try {
      dispatch(__setActiveAudioFile({
        originalPath,
        fileName
      }))
      await dispatch(__extractMetadataFromActive())
      await (dispatch(__addTrackToDB()))
      dispatch(__createBookFolders())
      await dispatch(__copyAudioFileToLibrary())
      dispatch(__clearActiveAudioFile())
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
    let { title, artist, album, track, year } = await extractMetaData(originalPath)
    console.log(await extractMetaData(originalPath))
    if (!album) album = 'Unknown'
    if (!artist) artist = ['Unknown']
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
      originalPath,
      metadata: { artist, album, track, title }
    } = getState().library.activeAudioFile
    await addTrackToDB({
      originalPath,
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
  (payload = {}) => __openDialog(payload)
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
