import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { string, func, bool, object, array } from 'prop-types'
import _ from 'lodash'

import {
  setActiveBook,
  $loadActiveBookTracks as loadActiveBookTracks,
  clearActiveBooktracks
} from '../../common/actions/libraryView'
import BookInfo from '../components/BookInfo'

const mapStateToProps = state => {
  const { loading, tracks, bookName, author } = state.libraryView.activeBook
  const books = state.libraryView.books
  return {
    loading,
    tracks,
    books,
    bookName,
    author
  }
}

const mapDispatchToProps = {
  setActiveBook,
  loadActiveBookTracks,
  clearActiveBooktracks
}

@connect(mapStateToProps, mapDispatchToProps)
class OpenBook extends PureComponent {
  static propTypes = {
    setActiveBook: func,
    loadActiveBookTracks: func,
    id: string,
    loading: bool,
    tracks: object,
    bookName: string,
    author: array,
    books: object,
    clearActiveBooktracks: func
  }

  componentDidMount () {
    const {
      id,
      setActiveBook,
      books,
      loadActiveBookTracks
    } = this.props
    const {
      trackIds,
      author,
      bookName
    } = books[_.findKey(books, book => book._id === id)]
    setActiveBook({id, author, bookName})
    loadActiveBookTracks(trackIds)
  }

  render = () =>
    this.props.loading
      ? <h1>Loading</h1>
      : <BookInfo
        loading={this.props.loading}
        tracks={this.props.tracks}
        bookName={this.props.bookName}
        author={this.props.author}
      />

  componentWillUnmount () {
    this.props.clearActiveBooktracks()
  }
}

export default OpenBook
