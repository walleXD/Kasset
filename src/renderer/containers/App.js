import React from 'react'
import Switch from 'react-router-dom/Switch'
import { injectGlobal } from 'styled-components'

import DefaultLayout from '../layouts/default'
import HomePage from '../pages/home'
import ExamplePage from '../pages/example'
import SettingsPage from '../pages/settings'
import AuthorsPage from '../pages/authors'
import BooksPage from '../pages/books'

injectGlobal`
  body {
    margin: 0
  }
`

const App = () =>
  <Switch>
    <DefaultLayout path='/' component={HomePage} exact />
    <DefaultLayout path='/example' component={ExamplePage} />
    <DefaultLayout path='/settings' component={SettingsPage} />
    <DefaultLayout path='/authors' component={AuthorsPage} />
    <DefaultLayout path='/books' component={BooksPage} />
  </Switch>

export default App
