/*
Action Prefix
__ACTION-NAME : runs on main thread
_ACTION_NAME : run on the renderer
ACTION_NAME: runs on all threads
*/

import { routerReducer } from 'react-router-redux'

import example from './example'
import settings from './settings'

export default {
  router: routerReducer,
  example,
  settings
}

export * from './example'
export * from './settings'
