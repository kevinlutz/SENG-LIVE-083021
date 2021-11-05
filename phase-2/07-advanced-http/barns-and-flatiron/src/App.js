//NPM
import {useState, useEffect} from 'react'
//CSS
import './App.css'
//Components
import Header from './components/Header'
import Form from './components/Form'
import Filter from './components/Filter'
import BookCard from './components/BookCard'
import BookDetail from './components/BookDetail'

function App() {
  //What does useState return? It returns a pair of values: the current state and a function that updates it. 
  const [isVisible, setIsVisible] = useState(false)
  const [darkMode, setDarkMode] = useState('not-dark-mode')
  const [selectedBook, setSelectedBook] = useState(null)
  const [genreList, setGenres] = useState([])
  const [bookList, setBookList] = useState([])
  const [fullBookList, setFullBookList] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')

  //TODO: Create a fetch that will get our books and genres when our component mounts for the first time and only the first time
  // http://localhost:4000/books
  //  http://localhost:4000/genres
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
  
  //Adds new book to state
  function addBook(newBook){
    setBookList([newBook, ...bookList])
  }
  
  //Handles Dark Mode
  function handleDarkMode(){
    if(darkMode === 'not-dark-mode'){
      setDarkMode('dark-mode')
    }else {
      setDarkMode('not-dark-mode')
    }
  }

  //Sets selected book to state 
  function handleSelectBook(book){
    setSelectedBook(book)
  }
  //Sets selected genre and filters books
  function handleFilterBooks(genre){
    const filteredBooks = fullBookList.filter(book => book.genre.toLowerCase() === genre.toLowerCase() )
    setBookList(filteredBooks)
  }

  return (
    <div className={darkMode}>
        <Header handleDarkMode={handleDarkMode} storeName={"Barns and Flatiron"} />
        {/* If is isVisible is true we will render our form */}
        {isVisible? <Form addBook={addBook}/> : null }
        {/* toggles if isVisible onClick */}
        <button onClick={() => setIsVisible(!isVisible)}>{isVisible?'Hide Form':'Add Book'}</button>
        <Filter genres={genreList} handleFilterBooks={handleFilterBooks}/>
        {selectedBook?<BookDetail book={selectedBook} />:null}
        {/* renders a BookCard for every book in our books array */}
        {bookList.map((book) => <BookCard key={book.title} book={book} handleSelectBook={handleSelectBook}/>)}
    </div>
  );
}

export default App;



