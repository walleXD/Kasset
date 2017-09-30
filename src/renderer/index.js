import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Router from 'react-router-redux/ConnectedRouter'
import { replayActionRenderer } from 'electron-redux'
import { Provider as RebassProvider } from 'rebass'
import 'typeface-roboto/index.css'
import 'mdi/scss/materialdesignicons.scss'
import './lib/icon.scss'

import history from './lib/history'
import store from './lib/store'
import App from './containers/App'

replayActionRenderer(store)

const renderApp = Component => render(
  <AppContainer>
    <ReduxProvider store={store}>
      <Router history={history}>
        <RebassProvider>
          <Component />
        </RebassProvider>
      </Router>
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('app')
)

renderApp(App)

if (module.hot) module.hot.accept('./containers/App', () => renderApp(require('./containers/App').default))
