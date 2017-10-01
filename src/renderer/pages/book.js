import React from 'react'
import { Box } from 'rebass'

import BookInfo from '../components/BookInfo'

const BookPage = props =>
  <Box>
    {console.log(props)}
    <BookInfo />
  </Box>

export default BookPage
