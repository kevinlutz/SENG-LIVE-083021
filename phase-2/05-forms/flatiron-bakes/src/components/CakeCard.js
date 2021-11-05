import {useState} from 'react'
function CakeCard({cake}) {
  const [selected, setSelected] = useState(null)
  function handleClick(){
    if(!selected){
      setSelected({border: "3px solid black"})
    } else {
      setSelected(null)
    }
  }
    return (
      <div onClick={handleClick} style={selected}>
        <h1>{cake.flavor}</h1>
        <h1>{cake.size}</h1>
        <p>${cake.price}</p>
      </div>
    );
  }
  
  export default CakeCard;
  