import React, { useEffect, useState } from "react";

function App() {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/ingredients")
      .then((r) => r.json())
      .then((ingredients) => console.log(ingredients));
  }, []);

  return (
    <div className="App">
      Check out our ingredients!
    </div>
  );
}

export default App;

