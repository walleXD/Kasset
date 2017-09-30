import React, { PureComponent } from 'react'
import { Flex } from 'rebass'
import { connect } from 'react-redux'
import { object, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import BookCard from '../components/BookCard'

const mapStateToProps = state => {
  const { libraryView: {
    loading,
    books
  } } = state
  return {
    loading, books
  }
}

@connect(mapStateToProps)
class BookLoader extends PureComponent {
  static propTypes = {
    books: object,
    loading: bool
  }

  _loadBooks = books =>
    Object.keys(books).length === 0
      ? <h1>No Books in library</h1>
      : _.values(books)
        .sort((a, b) => a.bookName.localeCompare(b.bookName))
        .map(({author, bookName, _id}, i) =>
          <BookCard
            key={_id}
            is={Link}
            to={`/book/${_id}`}
            mb={2} mx={1}
            w={[1 / 2, 1 / 3, '23.8%', '19.2%']}
            src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png'
            bookName={bookName}
            author={author[0]}
          />)

  render = () =>
    <Flex wrap>
      {this.props.loading
        ? <h1>Loading</h1> // TODO: Create proper loading component
        : this._loadBooks(this.props.books)}
    </Flex>
}

export default BookLoader

// TODO: Rename to bookshelf
