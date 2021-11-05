//naming convention
function BookCard({title, author, genre}) {
    return (
        <div style={{border: "1px solid black"}}>
            <h2>Title: {title}</h2>
            <p>Author: {author} </p>
            <p>Author: {genre} </p>
        </div>
    );
  }
export default BookCard;