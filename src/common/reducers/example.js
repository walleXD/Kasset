import { createAction, handleActions, combineActions } from 'redux-actions'

export const increment = createAction('@@example/INCREMENT')
export const decrement = createAction('@@example/DECREMENT', i => -i)

export default handleActions({
  [combineActions(increment, decrement)]: (state, { payload }) => ({
    ...state, score: state.score + payload
  })
}, {score: 0})
