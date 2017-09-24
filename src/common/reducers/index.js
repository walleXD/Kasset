/*
Action Prefix
__ACTION-NAME : runs on main thread
$ACTION_NAME : run on the renderer
ACTION_NAME: runs on all threads
*/

import { routerReducer } from 'react-router-redux'

import example from './example'
import settings from './settings'
import library from './library'

// TODO: Fix action prefixes
export default {
  router: routerReducer,
  example,
  settings,
  library
}

export * from './example'
export * from './settings'
export * from './library'
