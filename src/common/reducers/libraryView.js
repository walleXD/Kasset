import { handleActions } from 'redux-actions'

import {
  __loadAllBooks,
  __setLoadingState,
  setActiveBook,
  __loadActiveBookTracks,
  clearActiveBooktracks
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
  loading: false,
  activeBook: {
    loading: false,
    id: '',
    author: [],
    bookName: '',
    tracks: {
      // 0: {}
    }
  }
}

export default handleActions({
  [__loadAllBooks]: (state, { payload }) => ({
    ...state, books: {...payload}
  }),
  [__setLoadingState]: (state, { payload }) => ({
    ...state, loading: payload
  }),
  [setActiveBook]: (state, { payload: {id, bookName, author} }) => ({
    ...state, activeBook: { loading: true, id, bookName, author }
  }),
  [__loadActiveBookTracks]: (state, { payload }) => ({
    ...state,
    activeBook: {
      ...state.activeBook,
      tracks: payload,
      loading: false
    }
  }),
  [clearActiveBooktracks]: (state) => ({
    ...state, activeBook: { loading: false }
  })
}, INITIAL_STATE)
