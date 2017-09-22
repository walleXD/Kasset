import React from 'react'
import Switch from 'react-router-dom/Switch'
import { injectGlobal } from 'styled-components'

import DefaultLayout from '../layouts/default'
import HomePage from '../pages/home'
import ExamplePage from '../pages/example'

injectGlobal`
  body {
    margin: 0
  }
`

const App = () =>
  <Switch>
    <DefaultLayout path='/' component={HomePage} exact />
    <DefaultLayout path='/example' component={ExamplePage} />
  </Switch>

export default App
