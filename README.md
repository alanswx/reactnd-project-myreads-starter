# MyReads Project


To implement MyReads I added a number of React components:

* Book:  This component prints out a book, and sets the select correctly based on the book.shelf value. It will also fire the onChange when the select is chosen.

* BookList:  This component is a simple list of books. It uses array map to create an li (with the key based on book.id), and a Book
 
* BookShelf: Bookshelf filters the books based on a shelf type that is passed in as a property. It also takes a property as a display name for the bookshelf title. It calls through to BookList with a subset of the book list based on this shelf's type.

* SearchBooks: The search code has a managed control that takes in input characters. On change it makes a request to the backend server. When it gets the result, it needs to take the book list property, and see if any of those book id's match book's we have received from the server. We then set the shelf on each searchResult book so it will be categorized correctly. This code also splits the results into multiple shelves based on the shelf paramter. It calls through to the same BookShelf component that is used by the main app screen. If the user changes the shelf on a book, it calls to app to change the state. The book state bubbles back down as a property, and we need to intercept it with a componentWillReceiveProps - so that we can update our internal state (searchResults). This will cause the book to switch shelves without a new search being done.

* App: This implements the router, and calls either the SearchBooks component, or a number of BookShelf components to display the content.  App implements componentDidMount to get the books from the server on first load. It also implements the updateBookShelf that will change the shelf state of a book - push it back to the server, and fire off an AJAX request to reload the books, and cause the state of the books to propogate back through the app. 

## Ugliness I don't quite understand

I created the updateBookShelf methods on the App.js at the top of the app. I am a bit confused why I needed to bind the method to this:
`                updateBookShelf={this.updateBookShelf.bind(this)}
`
I am wondering if I am just missing some fancy javascript syntax to make this transparent. Otherwise when the app ended up in updateBookShelf it couldn't access the this object.





## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

