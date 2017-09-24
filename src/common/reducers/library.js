import { createAction, handleActions } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import { openDialog, extractMetaData } from '../../main/lib/utils'

const INITIAL_STATE = {
  activeAudioFile: {
    originalPath: '',
    metaData: {}
  }
}

export const __openDialog = createAction(
  'library/OPEN_DIALOG',
  () => async dispatch => {
    try {
      const file = await openDialog()
      if (!file) return null
      dispatch(__setActiveAudioFile(file))
      dispatch(__extractMetadataFromActive())
    } catch (e) {
      return null
    }
  }
)

const __setActiveAudioFile = createAction(
  'library/SET_ACTIVE_AUDIO_FILE'
)

const __extractMetadataFromActive = createAction(
  'library/EXTRACT_METADATA_FROM_ACTIVE',
  () => async (dispatch, getState) => {
    const { originalPath } = getState().library.activeAudioFile
    console.log(await extractMetaData(originalPath))
  }
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
    ...state, activeAudioFile: { originalPath: payload }
  }),
  [__clearActiveAudioFile]: state => ({
    ...state, activeAudioFile: INITIAL_STATE.activeAudioFile
  })
}, INITIAL_STATE)
