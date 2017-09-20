import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import example from './example'

export default combineReducers({
  router: routerReducer,
  example
})

export * from './example'
