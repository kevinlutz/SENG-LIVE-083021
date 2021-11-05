import {useState} from 'react'
function CakeCard({cake, handleClick}) {

    return (
      <div onClick={() => handleClick(cake)}>
        <h1>{cake.flavor}</h1>
        <h1>{cake.size}</h1>
        <p>${cake.price}</p>
      </div>
    );
  }
  
  export default CakeCard;
  