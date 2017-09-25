import React, { PureComponent } from 'react'
import { Button } from 'rebass'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import { $openDialog as openDialog } from '../../common/reducers'

@connect(null, { openDialog })
class ExperimentalContainer extends PureComponent {
  static propTypes = {
    openDialog: func
  }
  render = () =>
    <div>
      <Button onClick={() => this.props.openDialog()}>Open</Button>
      <Button onClick={() => this.props.openDialog({ openDirectory: true })}>Open Dir</Button>
    </div>
}

export default ExperimentalContainer
