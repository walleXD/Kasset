import React from 'react'
import { Flex, Box, Text, ButtonOutline } from 'rebass'
import Icon from './Icon'
import styled from 'styled-components'
import { string, number } from 'prop-types'

const TrackRow = ({className, trackNumber, title, remainingTime, ...restProps}) =>
  <Flex p={3} {...restProps} className={className}>
    <Box w='10%' py={1}>
      <Text>{trackNumber || 1}</Text>
    </Box>
    <Box w='65%' py={1}>
      <Text bold>{title || 'Some shitty name'}</Text>
    </Box>
    <Box w='15%' py={1}>
      <Text>{remainingTime || '00:00:12'}</Text>
    </Box>
    <Box w='10%'>
      <Flex>
        <ButtonOutline ml='auto' p={1}>
          <Icon>play_arrow</Icon>
        </ButtonOutline>
      </Flex>
    </Box>
  </Flex>

TrackRow.propTypes = {
  className: string,
  title: string,
  trackNumber: number,
  remainingTime: string
}

export default styled(TrackRow)`
  border-bottom: 0.5px solid black;
`
