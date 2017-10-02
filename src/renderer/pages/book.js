import React from 'react'
import { object } from 'prop-types'

import BookOpen from '../containers/BookOpen'

const BookPage = ({ match }) =>
  <BookOpen id={match.params.id} />

BookPage.propTypes = {
  match: object
}

export default BookPage
