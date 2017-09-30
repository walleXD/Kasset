import { handleActions } from 'redux-actions'

import {
  __loadAllBooks,
  __setLoadingState
} from '../actions/libraryView'

const INITIAL_STATE = {
  books: {
    // 0: {
    //   _id: '',
    //   author: [],
    //   bookName: '',
    //   trackIds: []
    // } // Documents from DB
  },
  loading: false
}

export default handleActions({
  [__loadAllBooks]: (state, { payload }) => ({
    ...state, books: {...payload}
  }),
  [__setLoadingState]: (state, { payload }) => ({
    ...state, loading: payload
  })
}, INITIAL_STATE)
