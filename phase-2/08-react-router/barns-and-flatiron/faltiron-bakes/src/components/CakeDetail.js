function CakeDetail({cake,handleDeleteCake}) {


    return (
      <div >
        <img src={cake.image}/>
        <h1>{cake.flavor}</h1>
        <h1>{cake.size}</h1>
        <p>${cake.price}</p>
        <p>{cake.description}</p>
        <button onClick={handleDeleteCake}></button>
      </div>
    );
  }
  
  export default CakeDetail;