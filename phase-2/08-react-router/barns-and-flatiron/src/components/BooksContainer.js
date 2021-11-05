import Filter from './Filter'
import BookCard from './BookCard'

function BooksContainer({bookList, genreList, updateBook, handleFilterBooks}){

    return(
      <>
            <Filter genres={genreList} handleFilterBooks={handleFilterBooks}/>
            {bookList.map((book) => <BookCard key={book.title} book={book} updateBook={updateBook}/>)}

      </>
    )
  }
  export default BooksContainer;
  