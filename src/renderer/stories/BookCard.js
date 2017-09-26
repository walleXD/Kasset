import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex } from 'rebass'
// import { action } from '@storybook/addon-actions'

import BookCard from '../components/BookCard'

export default () => {
  storiesOf('BookCard', module)
    .add('Base', () =>
      <BookCard
        album='sup'
        author='YOYO'
        src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png'
      />
    )
    .add('With Grid', () =>
      <Flex wrap>
        <BookCard mb={2} mx={1}
          w={[1 / 2, 1 / 3, '25%', '18%']}
          src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png'
          album='album'
          author='Jim Jimmy'
        />
      </Flex>
    )
}
