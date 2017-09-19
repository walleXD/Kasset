import { triggerAlias, replayActionMain } from 'electron-redux'
import initStore from '../../common/lib/initRedux'

const isDev = process.env.NODE_ENV !== 'production'

export default initStore(
  undefined,
  middleware => {
    if (isDev) {
      middleware.push(
        require('redux-node-logger').default()
      )
    }
    middleware.push(replayActionMain)
    middleware.unshift(triggerAlias)
    return middleware
  }
)
