import { createAction } from 'redux-actions'
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

export const __processSelection = createAction(
  'library/PROCESS_SELECTION',
  input => async dispatch =>
    isFile(input)
      ? dispatch(__processAudioFile(input))
      : dispatch(__processFolder(input))
)

export const __processFolder = createAction(
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

export const __processAudioFile = createAction(
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

export const __errorHandler = createAction(
  'library/ERROR_HANDLER'
)

export const __setActiveAudioFile = createAction(
  'library/SET_ACTIVE_AUDIO_FILE'
)

export const __extractMetadataFromActive = createAction(
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

export const __createBookFolders = createAction(
  'library/CREATE_BOOK_FOLDERS',
  () => (dispatch, getState) => {
    const { libraryLocation } = getState().settings
    const { artist, album } = getState().library.activeAudioFile.metadata
    dispatch(__setBookLibraryDir(
      createBookFolder(artist[0], album, libraryLocation)
    ))
  }
)

export const __copyAudioFileToLibrary = createAction(
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

export const __addTrackToDB = createAction(
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

export const __setBookLibraryDir = createAction(
  'library/SET_BOOK_LIBRARY_DIR'
)

export const __setMetadataForActive = createAction(
  'library/SET_METADATA_FOR_ACTIVE'
)

export const __clearActiveAudioFile = createAction(
  'library/CLEAR_ACTIVE_AUDIO_FILE'
)

export const $openDialog = createAliasedAction(
  'library/OPEN_DIALOG',
  (payload = {}) => __openDialog(payload)
)
