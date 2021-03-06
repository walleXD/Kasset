import React, { PureComponent } from 'react'
import { Button } from 'rebass'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import {
  $getAllBooks as getAllBooks
} from '../../common/actions/libraryView'
import {
  $openDialog as openDialog
} from '../../common/actions/library'

@connect(null, { openDialog, getAllBooks })
class ExperimentalContainer extends PureComponent {
  static propTypes = {
    openDialog: func,
    getAllBooks: func
  }
  render = () =>
    <div>
      <Button onClick={() => this.props.openDialog()}>Open</Button>
      <Button onClick={() => this.props.openDialog({ openDirectory: true })}>Open Dir</Button>
      <Button onClick={() => this.props.getAllBooks()}>Load all books</Button>
    </div>
}

export default ExperimentalContainer
