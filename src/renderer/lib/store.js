import initStore from '../../common/lib/initRedux'
import { routerMiddleware } from 'react-router-redux'
import { forwardToMain, getInitialStateRenderer } from 'electron-redux'

import history from './history'

const isDev = process.env.NODE_ENV !== 'production'

const store = initStore(
  getInitialStateRenderer(),
  middleware => {
    if (isDev) {
      middleware.push(
        require('redux-logger').createLogger()
      )
    }
    return [
      forwardToMain,
      routerMiddleware(history),
      ...middleware
    ]
  }
)

export default store
