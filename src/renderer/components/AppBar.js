import React from 'react'
import { Toolbar, Button, Input, Box, Flex } from 'rebass'
import { string, func } from 'prop-types'

import Icon from './Icon'

const AppBar = ({className, goBack, goForward}) =>
  <Toolbar className={className}>
    <Box w='25%' py='auto'>
      <Button mr={1} onClick={goBack}>
        <Icon>arrow_back</Icon>
      </Button>
      <Button ml={1} onClick={goForward}>
        <Icon>arrow_forward</Icon>
      </Button>
    </Box>
    <Box w='50%' py='auto'>
      <Input disabled placeholder='Search' />
    </Box>
    <Box w='25%'>
      <Flex>
        <Button ml='auto'>
          <Icon>settings</Icon>
        </Button>
      </Flex>
    </Box>
  </Toolbar>

AppBar.propTypes = {
  className: string,
  goBack: func,
  goForward: func
}

export default AppBar
