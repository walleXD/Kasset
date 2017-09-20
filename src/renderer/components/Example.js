import React from 'react'
import { Button } from 'rebass'
import { number, func } from 'prop-types'

const Example = ({score, increment, decrement}) =>
  <div>
    <span>{score}</span>
    <br />
    <Button onClick={() => increment(1)}>Add</Button>
    <Button onClick={() => decrement(1)}>Substract</Button>
  </div>

Example.propTypes = {
  score: number,
  increment: func,
  decrement: func
}

export default Example
