import React from 'react'
import { Box } from 'rebass'
import { object } from 'prop-types'

import TrackRow from './TrackRow'
import InfoBanner from './InfoBanner'

const BookInfo = ({ tracks, ...restProps }) =>
  <Box>
    <InfoBanner {...restProps} />
    <Box>
      {
        Object.keys(tracks)
          .map(key => tracks[key])
          .sort((a, b) => a.trackNum.no - b.trackNum.no)
          .map(({ title, trackNum, hash }) =>
            <TrackRow key={hash} title={title} trackNumber={trackNum.no} />)
      }
    </Box>
  </Box>

BookInfo.propTypes = {
  tracks: object
}

export default BookInfo
