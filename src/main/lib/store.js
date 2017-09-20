import { forwardToRenderer, triggerAlias } from 'electron-redux'
import initStore from '../../common/lib/initRedux'

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
  }
)

export default store
