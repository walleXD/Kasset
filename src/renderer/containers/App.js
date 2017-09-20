import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'
import Link from 'react-router-dom/Link'

import HomePage from '../pages/home'
import ExamplePage from '../pages/example'

const App = () =>
  <div>
    <button>Hello</button>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/example'>Example</Link></li>
    </ul>
    <Switch>
      <Route path='/' component={HomePage} exact />
      <Route path='/example' component={ExamplePage} />
    </Switch>
  </div>

export default App
