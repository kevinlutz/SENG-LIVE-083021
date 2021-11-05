For this exercise:

1. Create a new migration that will set up the Pizza table.
2. A pizza has a name and description. Name should be a string while description should be text to allow for more characters.
3. Create a table for the Pizza Ingredient class. A pizza Ingredient belongs to both the Pizza and Ingredients class. 
4. Create a table for the Ingredient class. An ingredient will have a name attribute that is a string.
(Don't forget to add these associations to the models as well)
5. Make sure to run the migrations and confirm that the table has been created. Hint: the schema file is a great resource for investigating database structures
6. Create a seeds file and add some new pizza's, ingredients and pizza ingredients. Pizza ingredients should be associated to a particular pizza and ingredient. Don't forget to seed your data.



domain modeling:

pizza
- name: string
- desc: text
- has_many :pizza_ingredients
- has_many :ingredients, through: :pizza_ingredients

ingredients
- name: string
- has_many :pizza_ingredients
- has_many :pizzas, through: :pizza_ingredients

pizza_ingredients(join table) - purpose: 
- belong to pizza
- belong to ingredient