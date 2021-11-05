# pizzas, ingredients and pizza_ingredients 


# pizzas 

pepperoni = Pizza.create(name: 'pepperoni pizza', desc: "yummy")
pepperoni_ing = Ingredient.create(name: 'pepperoni')
jalapeno = Ingredient.create(name: 'jalapeno')


PizzaIngredient.create(pizza_id: pepperoni.id, ingredient_id: pepperoni_ing.id)
# Pizza_Ingredient.create(pizza: pepperoni, ingredient: pepperoni_ing)