import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {

  state = {
   books : []
}

  // When the component mounts, we need to load out books from the AJAX call
  componentDidMount(){
    this.getAllBooks()
  }

  // This method fires off the AJAX call, and updates our state with the book list from the server
  getAllBooks(){
    BooksAPI.getAll().then((books)=>{this.setState({books})})
    console.log(this.state)
  }

  // This method updates the book onto a new shelf
  updateBookShelf(book,shelf){
    console.log("update book shelf")
    console.log(book)
    console.log(book.id)
    console.log(shelf)
    var that = this
    BooksAPI.update(book,shelf).then((result) => {
      that.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/search" render={({history})=>(
        <SearchBooks
          updateBookShelf={this.updateBookShelf.bind(this)}
          books={this.state.books}
        />

        )}/>

          <Route exact path="/" render={({history})=> (
            <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
              <BookShelf
                books={this.state.books}
                bookkey={'currentlyReading'}
                booktitle={'Currently Reading'}
                updateBookShelf={this.updateBookShelf.bind(this)}
                />
              <BookShelf
                books={this.state.books}
                bookkey={'wantToRead'}
                booktitle={'Want to Read'}
                updateBookShelf={this.updateBookShelf.bind(this)}
                />
              <BookShelf
                books={this.state.books}
                bookkey={'read'}
                booktitle={'Read'}
                updateBookShelf={this.updateBookShelf.bind(this)}
                />
              </div>
            </div>
            <div className="open-search">
            <Link
              to="/search"
              className="add-contact"
              >Add a book</Link>
            </div>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
