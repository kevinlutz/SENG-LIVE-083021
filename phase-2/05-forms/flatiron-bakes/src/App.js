import {useState} from 'react'
import Header from "./components/Header"
import CakeCard from "./components/CakeCard";
import SearchBar from "./components/SearchBar";
import cakes from './data';


function App() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Header />
      {visible?<SearchBar />:null}
      <button onClick={() => setVisible(!visible)}>{visible?'x':'Form'}</button>
      {cakes.map(cake => <CakeCard cake={cake}/>)}
    </>
  );
}

export default App;
