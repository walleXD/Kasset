import React from 'react'
import { configure, addDecorator } from '@storybook/react';
import { Provider as RebassProvider } from 'rebass'

const loadStories = () => {
  require('../src/renderer/stories')
}

addDecorator(story =>
  <RebassProvider>
    {story()}
  </RebassProvider>
)

configure(loadStories, module)
