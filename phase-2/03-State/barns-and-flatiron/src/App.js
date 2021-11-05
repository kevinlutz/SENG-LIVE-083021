//NPM

//CSS
import './App.css'
//Components
import Header from './components/Header'
import Form from './components/Form'
import Filter from './components/Filter'
import BookCard from './components/BookCard'
import {books } from './data.js'

function App() {
  return (
    <>
        <Header storeName={"Barns and Flatiron"} />
        <Form />
        <Filter />
        {books.map((book) => <BookCard key={book.title} title={book.title} author={book.author} genre={book.genre} likes={book.likes}/>)}
    </>
  );
}

export default App;



