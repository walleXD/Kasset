import React from 'react'
import { Image, Text, Box, Truncate } from 'rebass'
import { string } from 'prop-types'

import Card from './Card'

const BookCard = ({src, author, bookName, ...restProps}) =>
  <Card {...restProps}>
    <Image src={src} />
    <Box p={1} m={2}>
      <Truncate f={[1 / 2, 1, 2, 2]} bold>
        {bookName}
      </Truncate>
      <Text f={[1 / 2, 1, 2, 2]}>{author}</Text>
    </Box>
  </Card>

BookCard.propTypes = {
  src: string,
  bookName: string,
  author: string
}

export default BookCard
