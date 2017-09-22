import React, { PureComponent } from 'react'
import { node, func, object } from 'prop-types'
import { connect } from 'react-redux'
import { goBack, goForward } from 'react-router-redux'
import { withRouter, Link } from 'react-router-dom'

import AppBar from '../components/AppBar'

const mapDispatchToProps = {
  goForward,
  goBack
}

@withRouter
@connect(null, mapDispatchToProps)
class AppFrame extends PureComponent {
  static propTypes = {
    children: node,
    goForward: func,
    goBack: func,
    history: object
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

  render = () =>
    <div>
      <header>
        <AppBar
          goBack={this._goBack}
          goForward={this._goForward}
        />
      </header>
      <main>
        <Link to='/'>Home</Link>
        <Link to='/example'>Example</Link>
        {this.props.children}
      </main>
    </div>
}

export default AppFrame
