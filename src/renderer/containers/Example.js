import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { func, number } from 'prop-types'

import { increment, decrement } from '../../common/reducers'
import Example from '../components/Example'

const mapStateToProps = state => ({
  score: state.example.score
})

const mapDispatchToProps = {
  increment,
  decrement
}

@connect(mapStateToProps, mapDispatchToProps)
class ExampleContainer extends PureComponent {
  static propTypes = {
    score: number,
    increment: func,
    decrement: func
  }

  render = () => <Example {...this.props} />
}

export default ExampleContainer
