import { useState, useEffect } from "react"

function BookDetail({handleDelete}){
    const [book, setBook] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const id = 1;
    useEffect(() => {
        fetch(`http://localhost:4000/books/${id}`)
        .then(res => res.json())
        .then(book => {
            console.log('hi')

            console.log(book)
            setBook(book)
            setIsLoaded(true);
        });
    },[]);
    if (!isLoaded) return <h2>Loading...</h2>;
    return(
        <div>
            <img src={book.image} style={{width:"200px"}}/>
            <h3>{book.title}</h3>
            <p>{book.genre}</p>
            <p>{book.description}</p>
            <ul>
            {book.reviews.map(review => <li key={review.user_id}>{review.rating}/5: {review.content}</li>)}
            </ul>
            <button onClick={() => handleDelete(book)} >Delete</button>

        </div>
    );
};
export default BookDetail