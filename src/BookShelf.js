import React, {Component} from 'react'
import BookList from './BookList'
import PropTypes from 'prop-types'



class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    bookkey: PropTypes.string.isRequired,
    booktitle: PropTypes.string.isRequired,
    updateBookShelf: PropTypes.func.isRequired


  }


  render() {
    let thesebooks=this.props.books.filter((book)=>book.shelf===this.props.bookkey)

    if (thesebooks.length>0) {
      return (
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.booktitle}</h2>
            <div className="bookshelf-books">
              <BookList
                books={thesebooks}
                updateBookShelf={this.props.updateBookShelf}
              />
            </div>
          </div>
        </div>
    )
    }
    else {
      return (<div/>)
    }
    }
  }


  export default BookShelf
