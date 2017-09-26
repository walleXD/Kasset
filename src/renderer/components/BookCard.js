import React from 'react'
import { Image, Text, Box } from 'rebass'
import { string } from 'prop-types'

import Card from './Card'

const BookCard = ({src, author, album, ...restProps}) =>
  <Card {...restProps}>
    <Image src={src} />
    <Box p={1} m={2}>
      <Text f={[1 / 2, 1, 2, 2]} bold>{author}</Text>
      <Text f={[1 / 2, 1, 2, 2]}>{album}</Text>
    </Box>
  </Card>

BookCard.propTypes = {
  src: string,
  author: string,
  album: string
}

export default BookCard
