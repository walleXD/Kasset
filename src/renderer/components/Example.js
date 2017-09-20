import React from 'react'
import { number, func } from 'prop-types'

const Example = ({score, increment, decrement}) =>
  <div>
    <span>{score}</span>
    <button onClick={() => increment(1)}>Add</button>
    <button onClick={() => decrement(1)}>Substract</button>
  </div>

Example.propTypes = {
  score: number,
  increment: func,
  decrement: func
}

export default Example
