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
    <Button onClick={() => this.props.openDialog()}>Open</Button>
}

export default ExperimentalContainer
