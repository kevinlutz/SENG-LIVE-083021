function CakeCard({flavor, price, size}) {
    return (
      <>
        <h1>{flavor}</h1>
        <h1>{size}</h1>
        <p>${price}</p>
      </>
    );
  }
  
  export default CakeCard;
  