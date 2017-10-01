import React from 'react'
import Switch from 'react-router-dom/Switch'
import { injectGlobal } from 'styled-components'

import DefaultLayout from '../layouts/default'
import HomePage from '../pages/home'
import ExamplePage from '../pages/example'
import SettingsPage from '../pages/settings'
import AuthorsPage from '../pages/authors'
import BooksPage from '../pages/books'
import BookPage from '../pages/book'

injectGlobal`
  body {
    margin: 0
  }
`

const App = () =>
  <Switch>
    <DefaultLayout path='/' component={BooksPage} exact />
    <DefaultLayout path='/example' component={ExamplePage} />
    <DefaultLayout path='/settings' component={SettingsPage} />
    <DefaultLayout path='/authors' component={AuthorsPage} />
    <DefaultLayout path='/home' component={HomePage} />
    <DefaultLayout path='/book/:id' component={BookPage} />
  </Switch>

export default App
