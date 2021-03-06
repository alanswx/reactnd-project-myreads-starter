import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  }

  state = {
   searchResults: [],
   error: '',
   query:''
}

updateQuery = (query)=> {
  if (query.length===0) {
    this.setState({query:''})
    this.setState({searchResults:[]})

  }
  else {
    this.setState({query:query})
    BooksAPI.search(query).then((searchResults) =>  {


    if (searchResults instanceof Array) {
      // Go through the searchResults and if a book is in the "book" list, set the book.shelf correctly,
      // otherwise set it to None
      searchResults = searchResults.map((book)=> { var foundbook=this.props.books.find( x=> x.id === book.id); foundbook? book.shelf=foundbook.shelf:book.shelf='none'; return book})
      this.setState({error:''})
      this.setState({searchResults:searchResults})
    }
    else {
      console.log(searchResults)
      if (searchResults && searchResults.error)
        this.setState({error:searchResults.error})
      this.setState({searchResults:[]})
    }
    })
  }

  }

  componentWillReceiveProps (nextProps) {
    var searchResults = this.state.searchResults
    searchResults = searchResults.map((book)=> { var foundbook=nextProps.books.find( x=> x.id === book.id); foundbook? book.shelf=foundbook.shelf:book.shelf='none'; return book})
    this.setState({searchResults:searchResults})
  }


  render() {
    return (

<div className="search-books">
  <div className="search-books-bar">
    <Link className="close-search" to="/" >Close</Link>
    <div className="search-books-input-wrapper">
      {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
        <input
          name="query"
          onChange={(event)=>this.updateQuery(event.target.value)}
          type="text"
          placeholder="Search by title or author"
        />
    </div>
  </div>
  <div className="search-books-results">
  <div>
  <div className="list-books">
    <div className="list-books-title">
      <h1>Search Results</h1>
    </div>

    <div className="list-books-content">
    {this.state.error.length>0  && (
      <div>
      <span>Error: {this.state.error} </span>
      </div>
    )}
    <BookShelf
      books={this.state.searchResults}
      bookkey={'none'}
      booktitle={'Not in any list'}
      updateBookShelf={this.props.updateBookShelf}
      />
    <BookShelf
      books={this.state.searchResults}
      bookkey={'currentlyReading'}
      booktitle={'Currently Reading'}
      updateBookShelf={this.props.updateBookShelf}
      />
    <BookShelf
      books={this.state.searchResults}
      bookkey={'wantToRead'}
      booktitle={'Want to Read'}
      updateBookShelf={this.props.updateBookShelf}
      />
    <BookShelf
      books={this.state.searchResults}
      bookkey={'read'}
      booktitle={'Read'}
      updateBookShelf={this.props.updateBookShelf}
      />
    </div>
  </div>
  </div>
  </div>
  </div>



  )
  }
}


export default SearchBooks
