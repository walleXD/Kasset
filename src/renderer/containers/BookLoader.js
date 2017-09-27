import React, { PureComponent } from 'react'
import { Flex } from 'rebass'
import { connect } from 'react-redux'
import { array, bool } from 'prop-types'

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
    books: array,
    loading: bool
  }

  _loadBooks = books =>
    books
      ? books.map(({author, bookName}, i) =>
        <BookCard
          key={i}
          mb={2} mx={1}
          w={[1 / 2, 1 / 3, '23.8%', '19.2%']}
          src='https://static.tumblr.com/uqie0nv/1vIn5g72i/default_album_art.png'
          bookName={bookName}
          author={author[0]}
        />)
      : <h1>No Books in library</h1>

  render = () =>
    <Flex wrap>
      {this.props.loading
        ? <h1>Loading</h1>
        : this._loadBooks(this.props.books)}
    </Flex>
}

export default BookLoader
