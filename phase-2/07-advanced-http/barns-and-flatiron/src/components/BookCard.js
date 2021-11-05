import {useState, useEffect} from 'react'

function BookCard({book, handleSelectBook}) {
    const [liked, setLiked] = useState(false);
    useEffect(()=>{
        console.log('hi')
    },[liked])
    
    return (
        <div onClick={() => handleSelectBook(book)} style={{border: "1px solid black"}}>
            <h2>Title: {book.title}</h2>
            <p>Author: {book.author} </p>
            <p>Author: {book.genre} </p>
            <button onClick={() => setLiked(!liked)}>{liked?"❤️" : "♡"}</button>
        </div>
    );
  }
export default BookCard; 