import React from 'react'
import {
  Absolute,
  Overlay,
  Box,
  Close,
  Flex,
  Image,
  Heading,
  Text,
  Relative
} from 'rebass'

const BookOverlay = Overlay.extend`
  height: 80vh
`

const BookInfo = props =>
  <Relative>
    <Absolute
      top
      bottom
      left
      right
    >
      <BookOverlay w='80%'>
        <Close />
        <Flex>
          <Box w='50%' p={5}>
            <Image src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png' />
          </Box>
          <Flex w='50%' column align='center' justify='center'>
            <Box w='100%' pl={4}>
              <Heading>Book Name</Heading>
              <Text bold>Author Name</Text>
              <Text>2012</Text>
            </Box>
          </Flex>
        </Flex>
      </BookOverlay>
    </Absolute>
  </Relative>

export default BookInfo
