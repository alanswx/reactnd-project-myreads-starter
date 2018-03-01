import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'



class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired

  }


  render() {
    return (

        <ol className="books-grid">
        {this.props.books.map( (book)=> (
          <li key={book.id}>
            <Book
              book={book}
              updateBookShelf={this.props.updateBookShelf}
              />
          </li>
        ))}
        </ol>
      )
    }
  }


  export default BookList
