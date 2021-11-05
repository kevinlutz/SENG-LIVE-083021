import CakeCard from "./CakeCard";
import cakes from './data';

function App() {
  return (
    <>
       {cakes.map(cake => <CakeCard flavor={cake.flavor} price={cake.price} size={cake.size}/>)}
    </>
  );
}

export default App;
