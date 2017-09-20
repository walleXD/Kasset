import { forwardToRenderer, triggerAlias } from 'electron-redux'
import initStore from '../../common/lib/initRedux'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import { AsyncNodeStorage } from 'redux-persist-node-storage'
import { app } from 'electron'

const isDev = process.env.NODE_ENV !== 'production'

const store = initStore(
  { example: { score: 10 } },
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
    storage: new AsyncNodeStorage(app.getPath('userData'))
  },
  combineReducers(reducers))
)

export const persistentStore = persistStore(store)
export default store
