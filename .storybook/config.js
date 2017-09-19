import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components'

import theme from '../src/renderer/lib/theme'

const loadStories = () => {
  require('../src/renderer/stories')
}

addDecorator(story =>
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
)

configure(loadStories, module)
