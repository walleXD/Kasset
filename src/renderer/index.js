import { AppContainer } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Provider as ReduxProvider } from 'react-redux'
import Router from 'react-router-redux/ConnectedRouter'
import { replayActionRenderer } from 'electron-redux'

import 'typeface-roboto/index.css'
import 'mdi/scss/materialdesignicons.scss'
import './lib/icon.scss'
import theme from './lib/theme'

import history from './lib/history'
import store from './lib/store'
import App from './containers/App'

const renderApp = Component => render(
  <AppContainer>
    <ReduxProvider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </Router>
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('app')
)

replayActionRenderer(store)
renderApp(App)

if (module.hot) module.hot.accept('./containers/App', () => renderApp(App))
