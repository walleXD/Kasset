import React from 'react'
import { Flex, Heading, Box } from 'rebass'

import BookCard from '../components/BookCard'

const BooksPage = () =>
  <Box>
    <Heading my={2} ml={1}>Books</Heading>
    <Flex wrap>
      <BookCard mb={2} mx={1}
        w={[1 / 2, 1 / 3, '25%', '20%']}
        src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png'
        album='album'
        author='Jim Jimmy'
      />
    </Flex>
  </Box>

export default BooksPage
