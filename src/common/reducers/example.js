import { handleActions, combineActions } from 'redux-actions'

import { increment, decrement } from '../actions/example'

export default handleActions({
  [combineActions(increment, decrement)]: (state, { payload }) => {
    if (state.score) return {...state, score: state.score + payload}
    else return {...state, score: payload}
  }
}, {score: 0})
