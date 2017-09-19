import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const isDev = process.env.NODE_ENV !== 'production'

export default (
  preloadedState = {},
  injectMiddleware = undefined,
  injectReducer = undefined
) => {
  const prodMiddlewares = [
    promise,
    thunk
  ]

  const devMiddlewares = [
    require('redux-immutable-state-invariant').default()
  ]

  let middlewares = isDev
    ? [...devMiddlewares, ...prodMiddlewares]
    : prodMiddlewares

  if (injectMiddleware) middlewares = injectMiddleware(middlewares)

  const { composeWithDevTools } = process.type !== 'renderer'
    ? require('remote-redux-devtools')
    : require('redux-devtools-extension')

  const store = createStore(
    reducers(injectReducer),
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

// TODO: Add redux-persist support
