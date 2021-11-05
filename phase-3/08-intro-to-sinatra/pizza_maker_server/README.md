# Creating an API

### Objectives: 

- Handle multiple GET requests in a controller
- Use the params hash to look up data with Active Record
- Send a JSON response using data from an Active Record model
- Use the #to_json method to serialize JSON data

### Instructions:

- Start by running the server with `rake server`. In the browser, visit that endpoint with the server running: http://localhost:9292/ingredients. 
- Discuss with the group what the result in the browser indicates and how to resolve.
- Create an Ingredient controller
- Define a route `/ingredients` that will return a JSON response of all ingredients
- Test this out in Postman and the browser to confirm behavior is as expected
- Create a route that will process an incoming request like `/ingredients/3` and return a response of Ingredient with id 3 in JSON. 
