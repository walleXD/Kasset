import React from 'react'
import 'typeface-roboto'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

import loadAppBarStories from './AppBar'
import loadBookCardStories from './BookCard'
import loadBookInfoStories from './BookInfo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)

loadAppBarStories()
loadBookCardStories()
loadBookInfoStories()
