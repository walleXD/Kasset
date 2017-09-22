import React from 'react'
import Route from 'react-router-dom/Route'
import { func } from 'prop-types'

import AppFrame from '../containers/AppFrame'

const DefaultLayout = ({component: Component, ...rest}) =>
  <Route {...rest} render={matchProps =>
    <AppFrame>
      <Component {...matchProps} />
    </AppFrame>
  } />

DefaultLayout.propTypes = {
  component: func
}

export default DefaultLayout
