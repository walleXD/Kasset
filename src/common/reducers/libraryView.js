import { createAction, handleActions } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import { loadAllBooks } from '../../../src/main/lib/utils'

const INITIAL_STATE = {
  books: [
    {} // Documents from DB
  ],
  loading: false
}

const __getAllBooks = createAction(
  'library/VIEW/GET_ALL_BOOKS',
  () => async dispatch => {
    try {
      dispatch(__setLoadingState(true))
      const books = await loadAllBooks()
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

const __loadAllBooks = createAction(
  'library/VIEW/LOAD_ALL_BOOKS'
)

const __setLoadingState = createAction(
  'SET_LOADING_STATE'
)

export default handleActions({
  [__loadAllBooks]: (state, { payload }) => ({
    ...state, books: payload
  }),
  [__setLoadingState]: (state, { payload }) => ({
    ...state, loading: payload
  })
}, INITIAL_STATE)