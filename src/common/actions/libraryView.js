import { createAction } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import { loadAllBooks, loadAllTracks } from '../../../src/main/lib/utils'

export const __getAllBooks = createAction(
  'library/VIEW/GET_ALL_BOOKS',
  () => async dispatch => {
    try {
      dispatch(__setLoadingState(true))
      console.log('about to get all books')
      const books = await loadAllBooks()
      console.log('got all books')
      dispatch(__loadAllBooks(books))
      dispatch(__setLoadingState(false))
    } catch (e) {
      dispatch(__setLoadingState(false))
      console.error(e)
    }
  }
)

export const $getAllBooks = createAliasedAction(
  'library/VIEW/GET_ALL_BOOKS',
  () => __getAllBooks()
)

export const __loadAllBooks = createAction(
  'library/VIEW/LOAD_ALL_BOOKS'
)

export const __setLoadingState = createAction(
  'library/VIEW/SET_LOADING_STATE'
)

export const setActiveBook = createAction(
  'library/VIEW/SET_ACTIVE_BOOK'
)

export const __loadActiveBookTracks = createAction(
  'library/VIEW/LOAD_ACTIVE_BOOK_TRACKS',
  async trackIds => {
    try {
      return loadAllTracks(trackIds)
    } catch (e) {
      console.error(e)
    }
  }
)

export const $loadActiveBookTracks = createAliasedAction(
  'library/VIEW/LOAD_ACTIVE_BOOK_TRACKS',
  trackIds => __loadActiveBookTracks(trackIds)
)

export const clearActiveBooktracks = createAction(
  'library/VIEW/CLEAR_ACTIVE_BOOK_TRACKS'
)
