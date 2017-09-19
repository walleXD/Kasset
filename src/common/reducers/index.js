import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default injectReducer => combineReducers({
  router: routerReducer,
  ...injectReducer
})
