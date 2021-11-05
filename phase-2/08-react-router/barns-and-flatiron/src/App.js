//NPM
import {useState, useEffect, } from 'react';
//CSS
import './App.css';
//Components
import Header from './components/Header';
import Form from './components/Form';
import BookDetail from './components/BookDetail';
import BooksContainer from './components/BooksContainer';


function App() {
  const [darkMode, setDarkMode] = useState('not-dark-mode');
  const [genreList, setGenres] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [fullBookList, setFullBookList] = useState([]);




  useEffect(() => {
    fetch('http://localhost:4000/books')
    .then(res => res.json())
    .then(data => {
      setBookList(data)
      setFullBookList(data)
    })
    fetch('http://localhost:4000/genres')
    .then(res => res.json())
    .then(data => setGenres(data))
  },[])
  

  //Persists book with db.json
  function addBook(newBook){
    fetch('http://localhost:4000/books',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook)
    })
    .then(res => res.json())
    .then(dbBook => {
      setBookList([dbBook, ...bookList])
    });
  };

  //Updates Book
  function updateBook(e,book){
    e.stopPropagation()
    fetch(`http://localhost:4000/books/${book.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({liked: !book.liked})
    })
    .then(res => res.json())
    .then(updatedBook => {
      const updateBookList = bookList.map(blBook => {
        if(blBook.id === updatedBook.id){
          return updatedBook
        } else {
          return blBook
        }
      });
      setBookList(updateBookList)
      setFullBookList(updateBookList)
    });
  };

  //Deletes Book
  function handleDelete(book){
    fetch(`http://localhost:4000/books/${book.id}`,{
      method:'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      const filteredList = bookList.filter(blBook => blBook.id !== book.id)
      setBookList(filteredList)
      //TODO:Redirect back to books route after book is deleted 
    })
  }
  
  //Handles Dark Mode
  function handleDarkMode(){
    if(darkMode === 'not-dark-mode'){
      setDarkMode('dark-mode')
    }else {
      setDarkMode('not-dark-mode')
    }
  }


  //Sets selected genre and filters books
  function handleFilterBooks(genre){
    const filteredBooks = fullBookList.filter(book => book.genre.toLowerCase() === genre.toLowerCase() )
    setBookList(filteredBooks)
  }
  return (
    <div className={darkMode}>
        <Header handleDarkMode={handleDarkMode} storeName={"Barns and Flatiron"} />
        <Form addBook={addBook}/> 
        <BookDetail handleDelete={handleDelete} />
        <BooksContainer bookList={bookList} genreList={genreList} updateBook={updateBook} handleFilterBooks={handleFilterBooks}/>
    </div>
  );
}

export default App;



