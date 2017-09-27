import React from 'react'
import { Heading, Box } from 'rebass'

import BookLoader from '../containers/BookLoader'

const BooksPage = () =>
  <Box>
    <Heading my={2} ml={1}>Books</Heading>
    <BookLoader />
  </Box>

export default BooksPage
