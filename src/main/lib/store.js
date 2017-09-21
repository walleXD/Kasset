import { forwardToRenderer, triggerAlias } from 'electron-redux'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { AsyncNodeStorage } from 'redux-persist-node-storage'

import initStore from '../../common/lib/initRedux'

const isDev = process.env.NODE_ENV !== 'production'

const store = initStore(
  {},
  middleware => {
    if (isDev) {
      middleware.push(
        require('redux-node-logger')()
      )
    }
    return [
      triggerAlias,
      ...middleware,
      forwardToRenderer
    ]
  },
  reducers => persistReducer({
    key: 'kasset',
    debug: isDev,
    storage: new AsyncNodeStorage('/tmp')
  },
  combineReducers(reducers))
)

export default store
