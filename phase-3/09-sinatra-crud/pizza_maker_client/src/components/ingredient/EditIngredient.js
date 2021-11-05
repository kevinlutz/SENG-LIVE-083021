import React, { useState } from "react";

function EditIngredient({ ingredient, onUpdateIngredient }) {
  const { id, name } = ingredient;

  const [updatedName, setUpdatedName] = useState(name);
  function handleEditForm(e) {
    e.preventDefault();

    // Make a PATCH fetch request to update a single ingredient
    fetch(`http://localhost:9292/ingredients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then((resp) => resp.json())
      .then((updatedIngredient) => onUpdateIngredient(updatedIngredient));
  }

  return (
    <form onSubmit={handleEditForm}>
      <input
        id="name"
        type="text"
        name="name"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
      <input type="submit" value="Save" />
    </form>
  );
}

export default EditIngredient;
