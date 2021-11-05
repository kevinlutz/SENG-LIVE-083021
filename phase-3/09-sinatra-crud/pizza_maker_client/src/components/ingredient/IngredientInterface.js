import React, { useEffect, useState } from "react";
import NewIngredient from "./NewIngredient";
import IngredientList from "./IngredientList";

function Ingredient({ orgs }) {
  const [ingredients, setIngredients] = useState([]);

  // Make a GET request for all Ingredients
  useEffect(() => {
    fetch("http://localhost:9292/ingredients")
      .then((resp) => resp.json())
      .then((ingredients) => setIngredients(ingredients));
  }, []);

  const addNewIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  function handleUpdateIngredient(updatedIngredient) {
    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient.id === updatedIngredient.id) {
        return updatedIngredient;
      } else {
        return ingredient;
      }
    });
    setIngredients(updatedIngredients);
  }

  const deleteIngredient = (id) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(updatedIngredients);
  };

  return (
    <div className="App">
      <IngredientList
        ingredients={ingredients}
        deleteIngredient={deleteIngredient}
        onUpdateIngredient={handleUpdateIngredient}
      />
      <NewIngredient addNewIngredient={addNewIngredient} />
    </div>
  );
}

export default Ingredient;
