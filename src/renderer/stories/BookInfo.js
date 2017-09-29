import React from 'react'
import { storiesOf } from '@storybook/react'

import BookInfo from '../components/BookInfo'

export default () => {
  storiesOf('BookInfo', module)
    .add('Base', () => <BookInfo />)
    .add('With Styling Props', () => <BookInfo w='80%' />)
}
