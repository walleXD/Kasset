import React from 'react'
import { storiesOf } from '@storybook/react'
import XRay from 'react-x-ray'

import BookInfo from '../components/BookInfo'

export default () => {
  storiesOf('BookInfo', module)
    .add('Base', () => <BookInfo />)
    .add('With Styling Props', () =>
      <XRay>
        <BookInfo w='80%' />
      </XRay>
    )
}
