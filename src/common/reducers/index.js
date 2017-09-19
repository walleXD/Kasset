import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import example from './example'

export default (injectReducer = {}) => combineReducers({
  router: routerReducer,
  example,
  ...injectReducer
})

export * from './example'
