//NPM
import {useState} from 'react'
//CSS
import './App.css'
//Components
import Header from './components/Header'
import Form from './components/Form'
import Filter from './components/Filter'
import BookCard from './components/BookCard'
import {books, genres} from './data.js'

function App() {
  // const [clicks, setClicks] = useState(100)
  const [isVisible, setIsVisible] = useState('Add Book')

  function handleFormVisibility(){
    if(isVisible === 'Add Book'){
      setIsVisible('Hide Form')
    } else {
      setIsVisible('Add Book')
    }
  } 
  // Click hits a handler 
  // handler calls setState
  // When setState is called state is updated 
  // and the component re-renders with the new state

  return (
    <>
        <Header storeName={"Barns and Flatiron"} />
        {isVisible !== 'Add Book'? <Form /> : null }
        <button onClick={handleFormVisibility}>{isVisible}</button>
        <Filter genres={genres} />
        {books.map((book) => <BookCard key={book.title} book={book}/>)}
    </>
  );
}

export default App;



