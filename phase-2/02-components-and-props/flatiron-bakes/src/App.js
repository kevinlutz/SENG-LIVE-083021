import CakeCard from "./CakeCard";
function App() {
  return (
    <>
      <CakeCard flavor={"Carrot and Walnut"} price={20}/>
      <CakeCard flavor={"Chocolate"} price={25}/>
      <CakeCard flavor={"Carrot and Walnut"} price={28}/>
    </>
  );
}

export default App;
