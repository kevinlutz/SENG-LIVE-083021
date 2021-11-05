

function BookCard({book, updateBook}) {

    return (
        <div >
            <h2>Title: {book.title}</h2>
            <p>Author: {book.author} </p>
            <p>Author: {book.genre} </p>
            <button onClick={(e) => updateBook(e,book)}>{book.liked?"❤️" : "♡"}</button>
            <button >View Detail</button>
        </div>
    );
  }
export default BookCard; 