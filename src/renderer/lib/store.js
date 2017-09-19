import initStore from '../../common/lib/initRedux'
import { routerMiddleware } from 'react-router-redux'

import history from './history'

const isDev = process.env.NODE_ENV !== 'production'

export default initStore(
  {},
  middleware => {
    if (isDev) {
      middleware.push(
        require('redux-logger').createLogger()
      )
    }
    middleware.push(
      routerMiddleware(history)
    )
    return middleware
  }
)
