import React from "react";
import Ingredient from "./Ingredient";

function IngredientList({ ingredients, deleteIngredient, onUpdateIngredient }) {
  return (
    <div>
      <h3>Ingredients:</h3>
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          deleteIngredient={deleteIngredient}
          onUpdateIngredient={onUpdateIngredient}
        />
      ))}
    </div>
  );
}

export default IngredientList;
