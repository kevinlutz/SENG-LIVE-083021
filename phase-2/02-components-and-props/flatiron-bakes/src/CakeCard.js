function CakeCard(props) {
    return (
      <>
        <h1>{props.flavor}</h1>
        <p>${props.price}</p>
      </>
    );
  }
  
  export default CakeCard;
  