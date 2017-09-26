import React from 'react'
import { Toolbar, Button, Input, Box, Flex } from 'rebass'
import { string, func } from 'prop-types'

import Icon from './Icon'

const AppBar = ({className, goBack, goForward, openDialog, refreshBooks, push}) =>
  <Toolbar className={className}>
    <Box w='15%' py='auto'>
      <Button mr={1} onClick={goBack}>
        <Icon>arrow_back</Icon>
      </Button>
      <Button onClick={goForward}>
        <Icon>arrow_forward</Icon>
      </Button>
    </Box>
    <Box w='25%' py='auto'>
      <Button mr={1} onClick={() => openDialog()}>
        <Icon>library_add</Icon>
      </Button>
      <Button onClick={() => openDialog({ openDirectory: true })}>
        <Icon>create_new_folder</Icon>
      </Button>
      <Button ml={1} onClick={() => refreshBooks()}>
        <Icon>refresh</Icon>
      </Button>
    </Box>
    <Box w='55%' py='auto'>
      <Flex>
        <Input w='50%' disabled placeholder='Search' ml='auto' />
      </Flex>
    </Box>
    <Box w='10%'>
      <Flex>
        <Button onClick={() => push('/settings')} ml='auto' >
          <Icon>settings</Icon>
        </Button>
      </Flex>
    </Box>
  </Toolbar>

AppBar.propTypes = {
  className: string,
  goBack: func,
  goForward: func,
  openDialog: func,
  refreshBooks: func,
  push: func
}

export default AppBar
