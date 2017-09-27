import React from 'react'
import { Image, Text, Box } from 'rebass'
import { string } from 'prop-types'
import Truncate from 'react-truncate'

import Card from './Card'

const BookCard = ({src, author, bookName, ...restProps}) =>
  <Card {...restProps}>
    <Image src={src} />
    <Box p={1} m={2}>
      <Text f={[1 / 2, 1, 2, 2]} bold>
        <Truncate lines={2}>{bookName}</Truncate>
      </Text>
      <Text f={[1 / 2, 1, 2, 2]}>{author}</Text>
    </Box>
  </Card>

BookCard.propTypes = {
  src: string,
  bookName: string,
  author: string
}

export default BookCard
