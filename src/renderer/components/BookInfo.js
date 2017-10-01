import React from 'react'
import { Box } from 'rebass'

import TrackRow from './TrackRow'
import InfoBanner from './InfoBanner'

const BookInfo = props =>
  <Box>
    <InfoBanner />
    <Box>
      <TrackRow />
    </Box>
  </Box>

export default BookInfo
