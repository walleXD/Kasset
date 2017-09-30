import { createAction } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

import { loadAllBooks } from '../../../src/main/lib/utils'

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
  'SET_LOADING_STATE'
)