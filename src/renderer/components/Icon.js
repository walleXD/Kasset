import React from 'react'
import { string, bool } from 'prop-types'
import styled from 'styled-components'

const Icon = ({mdi, className, children}) =>
  mdi
    ? <i className={`mdi mdi-${children} ${className}`} />
    : <i className={`material-icons ${className}`}>{children}</i>

Icon.propTypes = {
  mdi: bool,
  className: string,
  children: string
}

export default styled(Icon)`
  &.material-icons, &.mdi {
    font-size: inherit;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    display: inline-flex;
  }
`
