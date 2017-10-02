import React from 'react'
import { Box } from 'rebass'
import { object, bool } from 'prop-types'

import TrackRow from './TrackRow'
import InfoBanner from './InfoBanner'

const BookInfo = ({ loading, tracks, ...restProps }) =>
  loading
    ? <h1>Loading...</h1>
    : (
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
    )

BookInfo.propTypes = {
  tracks: object,
  loading: bool
}

export default BookInfo
