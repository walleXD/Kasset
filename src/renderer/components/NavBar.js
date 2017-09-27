import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, TabItem, Flex, Box } from 'rebass'
import { func } from 'prop-types'

const NavBar = ({ isActive, ...restProps }) =>
  <Flex {...restProps} justify='center' is='nav'>
    <Box>
      <Tabs>
        <TabItem active={isActive('/')} f={[3]} is={Link} to='/'>Books</TabItem>
        <TabItem mr='0' active={isActive('/authors')} f={[3]} is={Link} to='/authors'>Authors</TabItem>
      </Tabs>
    </Box>
  </Flex>

NavBar.propTypes = {
  isActive: func
}

export default NavBar
