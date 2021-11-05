import {useState, useEffect} from 'react'
import Header from "./components/Header"
import CakeCard from "./components/CakeCard";
import SearchBar from "./components/SearchBar";
import CakeForm  from './components/CakeForm';
import CakeDetail from './components/CakeDetail';



function App() {
  const [visible, setVisible] = useState(false)
  const [selectedCake, setSelectedCake] = useState(null)
  const [cakeList, setCakeList] = useState([])

  useEffect(()=> {
    fetch('http://localhost:4000/cakes')
    .then(res => res.json())
    .then(data => setCakeList(data))
  },[])

  function handleAddCake(cake){
    fetch('http://localhost:4000/cakes',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cake)
    })
    .then(res => res.json())
    .then(newCake => {
      setCakeList([
        ...cakeList, newCake
      ])
    })
  }

  function handleDeleteCake(cake){
    fetch(`http://localhost:4000/cakes/${cake.id}`,{
      method:'DELETE',
    
    })
    .then(res => res.json())
    .then(() => {
      const filteredCakes = cakeList.filter(clCake => clCake!== cake)
      setCakeList(filteredCakes)
    })
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
      {selectedCake?<CakeDetail cake={selectedCake} handleDeleteCake={handleDeleteCake}/>:null}
      <button onClick={() => setVisible(!visible)}>{visible?'x':'Load Search Bar'}</button>
      {cakeList.map(cake => <CakeCard cake={cake} handleClick={handleClick}/>)}
    </>
  );
}

export default App;
