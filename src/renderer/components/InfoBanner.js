import React from 'react'
import { Flex, Box, Heading, Text, Image } from 'rebass'

const InfoBanner = ({...restOfProps}) =>
  <Flex {...restOfProps}>
    <Box w='50%' p={[5, 5, 5, 5, 6]}>
      <Image pl='25%' w='75%' src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png' />
    </Box>
    <Flex w='50%' column align='center' justify='center'>
      <Box w='100%' pl={4}>
        <Heading>Book Name</Heading>
        <Text bold>Author Name</Text>
        <Text>2012</Text>
      </Box>
    </Flex>
  </Flex>

export default InfoBanner
