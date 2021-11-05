import React, { useState } from "react";

function NewIngredient({ addNewIngredient }) {
  const [name, setName] = useState("");

  const configObj = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to create a new donation
    fetch("http://localhost:9292/ingredients", configObj)
      .then((resp) => resp.json())
      .then((ingredient) => {
        addNewIngredient(ingredient);
      });
  };

  return (
    <div>
      <h3>Add a new ingredient:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewIngredient;
