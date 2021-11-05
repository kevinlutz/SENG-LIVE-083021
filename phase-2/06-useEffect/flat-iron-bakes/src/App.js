import {useState, useEffect} from 'react'
import Header from "./components/Header"
import CakeCard from "./components/CakeCard";
import SearchBar from "./components/SearchBar";
import CakeForm  from './components/CakeForm';
import CakeDetail from './components/CakeDetail';
import cakes from './data';


function App() {
  const [visible, setVisible] = useState(false)
  const [selectedCake, setSelectedCake] = useState(null)
  const [cakeList, setCakeList] = useState(cakes)

  useEffect(()=> {
    fetch('http://localhost:4000/cakes')
    .then(res => res.json())
    .then(data => setCakeList(data))
  },[])

  function handleAddCake(cake){
    setCakeList([
      ...cakeList, cake
    ])

  }

  function handleClick(cake){   
      setSelectedCake(cake)
  }
  return (
    <>
      <Header />
      <CakeForm handleAddCake={handleAddCake}/>
      {visible?<SearchBar />:null}
      <br/>
      {selectedCake?<CakeDetail cake={selectedCake}/>:null}
      <button onClick={() => setVisible(!visible)}>{visible?'x':'Load Search Bar'}</button>
      {cakeList.map(cake => <CakeCard cake={cake} handleClick={handleClick}/>)}
    </>
  );
}

export default App;
