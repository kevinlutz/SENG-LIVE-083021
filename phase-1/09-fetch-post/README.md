# Making a POST request with Fetch

### Goals

- Execute post requests
- Explain the difference between optimistic and pessimistic rendering
- Explain the difference between each HTTP method

### Warm up:

What are the 4 popularly used HTTP verbs used in request-response cycles, and their associated actions

To use the mock-API:
First install JSON Server: `npm install -g json-server`
To start the server run `json-server --watch db.json`
This will produce the following endpoint: `http://localhost:3000/pokemons`

### Deliverables:

1. Make a POST request with values submitted through the form.
2. Render new content on the DOM

### Exercise Deliverables:

- For this exercise, we will create an interface that allows users to comment on the collection of cards.
- We have an endpoint `http://localhost:3000/comments` that will host the collection of comments submitted by a user. We will use this endpoint for any requests made in respect to comments.
- Currently we do not have the following:

  1. A form to submit a comment
  2. A request made to the server after the form has been submitted.
  3. Do not worry about displaying the comments currently. For now you can console.log the response to the request and inspect the data that is received.

- BONUS: If you have completed the above exercise, try to display the comments on the page. Do not worry about styling. You can be creative and display the comments as you would like. Things to think about:
  1. How to retreive all comments?
  2. Where should the comments exist?
  3. How to display comments?
