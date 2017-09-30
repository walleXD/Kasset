import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { _increment as increment, decrement } from '../../common/actions/example'
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
  render = () => <Example {...this.props} />
}

export default ExampleContainer
