import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import AppBar from '../components/AppBar'

export default () => {
  storiesOf('AppBar', module)
    .add('Base', () => <AppBar />)
}
