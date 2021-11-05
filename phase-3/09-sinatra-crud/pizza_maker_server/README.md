# Creating an API pt 2

### Deliverables
Build out the following routes to handle the necessary CRUD actions:

- `POST /ingredients`: 
    - Add a binding.pry to this route and use Postman to create a new ingredient with a name 
    - In the Pry session, check the `params` hash for the key/value pairs that were submitted and practice accessing the values. 
    - Create a new ingredient from the params, and return the newly created ingredient as JSON
- `PATCH /ingredients/:id`:
    - Add a binding.pry to this route 
    - In a seperate terminal, cd into the `pizza_maker_client` directory and run `npm start`
    - Click on the edit button for an ingredient, make an update, and save. This should invoke a pry session in the terminal that Sinatra server is running. 
    - Check the params hash to confirm that updated value is received. 
    - Find the ingredient given the id value in the params hash 
    - Update the name of the ingredient using params
    - Return the updated ingredient as JSON
- `DELETE /ingredients/:id`:
    - Find the ingredient given the id value in the params hash  
    - Delete the ingredient from the database
    - Test the delete button, inspect the Sinatra terminal to see if Active Record deletes the record
