import React, { PureComponent } from 'react'
import { node, func, object } from 'prop-types'
import { connect } from 'react-redux'
import { goBack, goForward } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import { Box, Fixed } from 'rebass'

import AppBar from '../components/AppBar'
import NavBar from '../components/NavBar'
import {
  $getAllBooks as refreshBooks
} from '../../common/actions/libraryView'
import {
  $openDialog as openDialog
} from '../../common/actions/library'

const mapDispatchToProps = {
  goForward,
  goBack,
  openDialog,
  refreshBooks
}

@withRouter
@connect(null, mapDispatchToProps)
class AppFrame extends PureComponent {
  static propTypes = {
    children: node,
    goForward: func,
    goBack: func,
    openDialog: func,
    refreshBooks: func,
    history: object,
    location: object
  }

  _goForward = () => {
    console.log(this.props)
    this.props.goForward()
  }

  _goBack = () => {
    if (this.props.history.length > 1) {
      this.props.goBack()
    }
  }

  isActive = path =>
    this.props.location.pathname === path

  // TODO: Fix back & forward behaviour
  render = () =>
    <div>
      <header>
        <Fixed w='100%'>
          <AppBar
            {...this.props}
            goBack={this._goBack}
            goForward={this._goForward}
          />
        </Fixed>
        <NavBar pt={5} isActive={this.isActive} />
      </header>
      <Box mx='5%' is='main'>
        {this.props.children}
      </Box>
    </div>
}

export default AppFrame
