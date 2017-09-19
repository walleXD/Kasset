import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise'

import reducers from '../reducers'

const isDev = process.env.NODE_ENV !== 'production'

export default (preloadedState = {}, injectMiddleware = null) => {
  const prodMiddlewares = [
    promiseMiddleware
  ]
  const devMiddlewares = [
    require('redux-immutable-state-invariant').default()
  ]

  let middlewares = isDev
    ? [...devMiddlewares, ...prodMiddlewares]
    : prodMiddlewares

  if (injectMiddleware) middlewares = injectMiddleware(middlewares)

  const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers/', () => {
      const nextReducer = require('../reducers/index').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
