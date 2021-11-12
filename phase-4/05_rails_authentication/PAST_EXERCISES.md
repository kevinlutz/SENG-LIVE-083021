# Phase 4 Exercises

NOTE: This rails application will be the one you use for every check for understanding going forward. Make sure you complete these steps on your machine before lecture tomorrow. If you are unable to complete this check for understanding, reach out to an instructor after lecture for help. 

In your breakout rooms one person should share their screen and walk through the activity. Everyone should be helping the presenter or following along. If you get stuck on a bug, switch to another student's screen to finish the activity and reach out to the lecturer or instructor for assistance after the lecture.


## Lesson 1

### Instructions


1. Create a new rails application for our reading list application. 
`rails new reading_list_api --api --minimal -T`
Note: Do not forget the --api! The rails application will not be configured correctly if you do! If you forget it, delete the application and re-create it. 
2. Configure cors by uncommenting the gem ‘rack-cors’ and going to config>initializers> cors.rb
Uncomment the following and replace `'example.com'` with `*`
```rb 
Rails.application.config.middleware.insert_before 0, Rack::Cors do
   allow do
     origins '*'

     resource '*',
       headers: :any,
       methods: [:get, :post, :put, :patch, :delete, :options, :head]
   end
 end
```
3. Create the following migrations for reading_list
![Reading List ERD](https://res.cloudinary.com/dnocv6uwb/image/upload/v1632087131/reading-list-erd_hgmw9t.png)
Note: you do not need to write the tables yourself. There is a way to automatically generate the table with the corresponding columns using rails generators

4. Go to Models and add the association macros necessary for many-to-many between users and books.. 
5. In the rails console OR in seeds create seeds for user and books and test your relationships. (You'll want to create books that are related to users, try checking out the [has_many](https://apidock.com/rails/ActiveRecord/Associations/ClassMethods/has_many) docs for examples). Feel free to use these if you like:
```
user_1 = User.create(
  username: 'tester1',
  email: 'test@test.com',
  bio: 'testing is my life!'
)
user_2 = User.create(
  username: 'tester2',
  email: 'testing@test.com',
  bio: 'to test or not to test, that is the question'
)

blink = user_1.books.create(
  title: 'Blink',
  author: 'Malcolmn Gladwell',
  description: "Blink is a book about how we think without thinking, about choices that seem to be made in an instant-in the blink of an eye-that actually aren't as simple as they seem. ... Now, in Blink, he revolutionizes the way we understand the world within.",
  cover_image_url: "https://res.cloudinary.com/dnocv6uwb/image/upload/v1631945315/ulnbyvuxti0mklh4ya46.jpg"
)

the_way_of_kings = user_1.books.create(
  title: 'The Way of Kings', 
  author: 'Brandon Sanderson',
  description: "The Way of Kings is an epic fantasy novel written by American author Brandon Sanderson and the first book in The Stormlight Archive series. The novel was published on August 31, 2010, by Tor Books. The Way of Kings consists of one prelude, one prologue, 75 chapters, an epilogue and 9 interludes. It was followed by Words of Radiance in 2014, Oathbringer in 2017 and Rhythm of War in 2020. A leatherbound edition is scheduled to be released in 2021.",
  cover_image_url: "https://res.cloudinary.com/dnocv6uwb/image/upload/v1631946131/menvv6ioanlrbh0qi35d.jpg"
)

name_of_the_wind = user_1.books.create(
  title: 'The Name of the Wind', 
  author: 'Patrick Rothfuss',
  description: "The Kingkiller Chronicle tells the life story of a man named Kvothe. In the present day, Kvothe is a rural innkeeper, living under a pseudonym. In the past, he was a wandering trouper and musician who grew to be a notorious arcanist (or wizard), known as the infamous \"Kingkiller\".

The series is framed as the transcription of his three-day-long oral autobiography, where he \"trouped, traveled, loved, lost, trusted and was betrayed.\" Present-day \"interludes\" concern his life as an innkeeper, with each present day depicted in a separate book.

The series is a secondary world fantasy; the setting is named Temerant. It has its own magic system, mixing alchemy, sympathetic magic, sygaldry (a form of runic magic combined with medieval engineering), and naming (a type of magic that allows the user to command the classical elements and objects), plus others.",
  cover_image_url: "https://res.cloudinary.com/dnocv6uwb/image/upload/v1631946293/220px-TheNameoftheWind_cover_jq2xut.jpg"
)
```
6. In `config/routes.rb` add an index and show route for books
7. In the Books controller add an index action that renders all of the books in json. Make a show action that renders 1 book’s information given the id (as a bonus, try to include the book’s users as well. 
8. Run your rails server and go to the browser (or use postman) to check that your json is being rendered for both routes

---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---
---

### Solutions

#### Create the new application
```bash
rails new reading_list_api --api --minimal -T
```

#### Uncomment rack-cors in Gemfile

```rb
# Gemfile
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.4'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.4', '>= 6.1.4.1'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'listen', '~> 3.3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

```

#### Configure CORS to allow requests from anywhere
```rb
# config/intializers/cors.rb
# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

#### Create Models/Migrations/Routes


```rb
rails g model User username email bio:text
```

```rb
rails g resource Book title author description:text cover_image_url
```

```rb
rails g model UserBook user:belongs_to book:belongs_to read:boolean
```

```bash
rails db:migrate
```

#### Add Relationships

```rb
class Book < ApplicationRecord
  has_many :user_books
  has_many :readers, through: :user_books, source: :user
end
```

```rb
class User < ApplicationRecord
  has_many :user_books
  has_many :books, through: :user_books
end

```

#### Add Seed Data

```rb
# db/seeds.rb
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_1 = User.create(
  username: 'tester1',
  email: 'test@test.com',
  bio: 'testing is my life!'
)
user_2 = User.create(
  username: 'tester2',
  email: 'testing@test.com',
  bio: 'to test or not to test, that is the question'
)

blink = user_1.books.create(
  title: 'Blink',
  author: 'Malcolmn Gladwell',
  description: "Blink is a book about how we think without thinking, about choices that seem to be made in an instant-in the blink of an eye-that actually aren't as simple as they seem. ... Now, in Blink, he revolutionizes the way we understand the world within.",
  cover_image_url: "https://res.cloudinary.com/dnocv6uwb/image/upload/v1631945315/ulnbyvuxti0mklh4ya46.jpg"
)

the_way_of_kings = user_1.books.create(
  title: 'The Way of Kings', 
  author: 'Brandon Sanderson',
  description: "The Way of Kings is an epic fantasy novel written by American author Brandon Sanderson and the first book in The Stormlight Archive series. The novel was published on August 31, 2010, by Tor Books. The Way of Kings consists of one prelude, one prologue, 75 chapters, an epilogue and 9 interludes. It was followed by Words of Radiance in 2014, Oathbringer in 2017 and Rhythm of War in 2020. A leatherbound edition is scheduled to be released in 2021.",
  cover_image_url: "https://res.cloudinary.com/dnocv6uwb/image/upload/v1631946131/menvv6ioanlrbh0qi35d.jpg"
)

name_of_the_wind = user_1.books.create(
  title: 'The Name of the Wind', 
  author: 'Patrick Rothfuss',
  description: "The Kingkiller Chronicle tells the life story of a man named Kvothe. In the present day, Kvothe is a rural innkeeper, living under a pseudonym. In the past, he was a wandering trouper and musician who grew to be a notorious arcanist (or wizard), known as the infamous \"Kingkiller\".

The series is framed as the transcription of his three-day-long oral autobiography, where he \"trouped, traveled, loved, lost, trusted and was betrayed.\" Present-day \"interludes\" concern his life as an innkeeper, with each present day depicted in a separate book.

The series is a secondary world fantasy; the setting is named Temerant. It has its own magic system, mixing alchemy, sympathetic magic, sygaldry (a form of runic magic combined with medieval engineering), and naming (a type of magic that allows the user to command the classical elements and objects), plus others.",
  cover_image_url: "https://res.cloudinary.com/dnocv6uwb/image/upload/v1631946293/220px-TheNameoftheWind_cover_jq2xut.jpg"
)

```

```bash
rails db:seed
```

#### Restrict routes to Index and Show

```rb
# config/routes.rb
Rails.application.routes.draw do
  resources :books, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
```

```rb
# app/controllers/books_controller.rb
class BooksController < ApplicationController
  def index
    render json: Book.all
  end

  def show
    render json: Book.find(params[:id]), include: [:readers]
  end
end

```

#### Boot server and test routes with Postman

```bash
rails s
```

Open up postman and try out these requests:

- GET 'http://localhost:3000/books'
- GET 'http://localhost:3000/books/1'


# Phase 4, Lecture 2 - Client Server Communication part 1 Exercise

Today's focus:

- building out `create` actions in our controllers
- validating user input
- using strong parameters to specify the allowed parameters for post/patch requests
- returning appropriate status codes

## Reading List Application features list

- As a User, I can create books that have a title, author, description and cover_image_url 
  - the title, author, and description should be required
  - the title should be unique within the scope of an author's books
- As a User, I can add existing books to my reading list 
  - user_books should have a book_id that occurs only once (maximum) for each user_id in the table. (No duplicate user_books for the same user and book)

> **NOTE**: Make sure that you create a `current_user` method in your application controller like we did in the demo so you can build endpoints in a way that will be consistent with our application's functionality after we have authentication configured next week.

<details>
  <summary>
    current_user method
  </summary>
  <hr/>

  ```rb
  class ApplicationController < ActionController::API

    private

    def current_user  
      User.first
    end
  end

```

  <hr/>

</details>
<br/>



## Disable Wrap Parameters 

Open the `config/intializers/wrap_parameters.rb` file. It currently looks like this:

```rb
ActiveSupport.on_load(:action_controller) do
  wrap_parameters format: [:json]
end
```

update it to this:

```rb
ActiveSupport.on_load(:action_controller) do
  wrap_parameters format: []
end
```

## Before getting started on the code:

1. Create a postman account and download it if you haven’t already. [POSTMAN](https://www.postman.com/downloads/)
2. Using the application you created yesterday and run your rails server
3. Using Postman, test the routes you created yesterday with GET requests.  (You can [fork my workspace](https://www.postman.com/dakota27/workspace/meetup-clone) so you don't have to input all these requests from scratch)

Note: Review Testing APIs with Postman in phase-4 on canvas if you’re stuck with postman. If you end up with a cors issue, confirm that you’ve configured your cors correctly from yesterday.

I've added a collection of requests to Postman that you can use to test the endpoints we're building today if you'd like to use it as a jumping off point:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3907819-a9936b1c-cf04-40f7-881a-8289c4b716b2?action=collection%2Ffork&collection-url=entityId%3D3907819-a9936b1c-cf04-40f7-881a-8289c4b716b2%26entityType%3Dcollection%26workspaceId%3D444acbc6-a930-491c-bda4-d4c508ae8a82)

You can also paste the provided fetch code into any browser console for testing purposes.



## Users can create books

### Request
Say we want to be able to support the following fetch request.
```js
fetch('http://localhost:3000/books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Blink",
    author: "Malcolmn Gladwell",
    description: "Cool book about the power of intuitive/automatic thinking"
  })
})
```

### Route

What route do you need to have to support the request above?

```rb
# config/routes.rb
# ensure only necessary routes are present (which ones have we actually built out?)
```

<details>
  <summary>
    route
  </summary>
  <hr/>

  ```rb
  resources :books, only: [:create]
```

  <hr/>

</details>
<br/>



### Controller

What changes need to happen in the controller to support this feature?
```rb
class BooksController < ApplicationController
  # ...
  def create
    # fill me in
  end

  # ...
  private

  def book_params
    # fill me in
  end
end
```

<details>
  <summary>
    book_params
  </summary>
  <hr/>

  ```rb
  def book_params
    params.permit(:title, :description, :author, :cover_image_url)
  end
```

  <hr/>

</details>
<br/>


### Model
Make sure to add validations to your model to ensure that title, description and author are present. Also, make sure that there can't be two books with the same title and the same author.

```rb
class Book < ApplicationRecord
  has_many :user_books
  has_many :readers, through: :user_books, source: :user

  # add validations
end

```

<details>
  <summary>
    validations
  </summary>
  <hr/>

  ```rb
  validates :title, :author, :description, presence: true
  validates :title, uniqueness: { scope: [:author] }
```

  <hr/>

</details>
<br/>



### Response

We want our API to check if we've successfully created a book or if some validation error prevented the save. To do this, we'll need to add some conditional logic to the create action:

```rb
class BooksController < ApplicationController
  # ...
  def create
    # add conditional logic with status codes
  end

  # ...
  private

  def book_params
    
  end
end
```

<details>
  <summary>
    create action
  </summary>
  <hr/>

  ```rb
  def create
    book = Book.create(book_params)
    if book.valid?
      render json: book, status: :created
    else
      render json: { errors: book.errors }, status: :unprocessable_entity
    end
  end
```

  <hr/>

</details>
<br/>



```js
fetch('http://localhost:3000/books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Blink",
    author: "Malcolmn Gladwell",
    description: "Cool book about the power of intuitive/automatic thinking"
  })
})
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      return response.json().then(errors => Promise.reject(errors))
    }
  })
  .then(book => {
    console.log(book) // if response was ok
  })
  .catch(errors => {
    console.error(errors) // if response was not ok
  })
```

You can test this one by trying to create the same book twice. It should work the first time, but then give you an error the next time.

## Users can add books to their reading list


### Request

```js
fetch('http://localhost:3000/user_books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    book_id: 1
  })
})
```

### Route
What route do we need to have to support the request above?
```rb
# config/routes.rb
# ensure only necessary routes are present (which ones have we actually built out?)
```

<details>
  <summary>
    route
  </summary>
  <hr/>

  ```rb
  resources :user_books, only: [:create]
```

  <hr/>

</details>
<br/>



### Controller

```rb
class UserBooksController < ApplicationController
  # ...
  def create
    # fill me in
  end

  # ...
  private

  def user_book_params
    # fill me in
  end
end
```
<details>
  <summary>
    user_book_params
  </summary>
  <hr/>

  ```rb
  def user_book_params
    params.permit(:book_id)
  end
```

  <hr/>

</details>
<br/>


### Model
We want to ensure that we aren't creating multiple user books for the same combination of user and book as that would serve no purpose here. Add a validation to make sure only one combination of the same book and user can occur.
```rb
class UserBook < ApplicationRecord
  belongs_to :user
  belongs_to :book

  # add validation
end

```

<details>
  <summary>
    validations
  </summary>
  <hr/>

  ```rb
  validates :book_id, uniqueness: { scope: [:user_id], message: "This book is already on your reading list."}
  ```

  <hr/>

</details>
<br/>

### Response

We want our API to check if we've successfully created an event or if some validation error prevented the save. To do this, we'll need to add some conditional logic to the create action:

```rb
class UserBooksController < ApplicationController
  # ...
  def create
    # add conditional logic
  end

  # ...
  private

  def user_book_params
    
  end
end
```

<details>
  <summary>
    create action
  </summary>
  <hr/>

  ```rb
  def create
    user_book = current_user.user_books.create(user_book_params)
    if user_book.valid?
      render json: user_book, status: :created
    else
      render json: { errors: user_book.errors }, status: :unprocessable_entity
    end
  end
  ```

  <hr/>

</details>
<br/>



```js
fetch('http://localhost:3000/user_books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    book_id: 1
  })
})
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      return response.json().then(errors => Promise.reject(errors))
    }
  })
  .then(user_book => {
    console.log(user_book) // if response was ok
  })
  .catch(errors => {
    console.error(errors) // if response was not ok
  })
```

You can test this one by trying to submit the request twice, it should work the first time but not the second.

# Phase 4, Lecture 3 - Client Server Communication part 2 Exercise

Today's focus:

- building out `update` and `delete` actions in our controllers

# Reading List Application

- Users can update whether or not they have read a book
- Users can remove a book from their reading list

## Users can update whether or not they have read a book

We need to be able to send a request from our client application to update whether or not the currently logged in user has read a given book.

### Request
<details>
  <summary>
    What request method do we need?
  </summary>
  <hr/>

  `PATCH`

  <hr/>

</details>
<br/>

<details>
  <summary>
    What will the path be?
  </summary>
  <hr/>

  `/user_books/:id`

  <hr/>

</details>
<br/>


<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  YES

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  YES
  - read

  <hr/>

</details>
<br/>

### Route
<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  `patch "/user_books/:id" => user_books#update`

  -- or --

  `resources :user_books, only: [:update]`

  <hr/>

</details>
<br/>

### Controller
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_books#update`

  <hr/>

</details>
<br/>

<details>
  <summary>
    Can we use our strong parameters from create or is update different for some reason? (only relevant for update actions)
  </summary>
  <hr/>

  In this case, we probably don't want to allow `book_id` through when doing an update, so we'll need a separate method for `user_book_params` here to only permit `read` to be updated.

  <hr/>

</details>
<br/>

### Model/Database
<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  Nope!

  <hr/>

</details>
<br/>

<details>
  <summary>
    Any changes needed to the database to support this request?
  </summary>
  <hr/>

  Nope!

  <hr/>

</details>
<br/>

<details>
  <summary>
    What model objects are involved and how do we interact with them in the controller?
  </summary>
  <hr/>

  - We need to find the `UserBook` object to update using the find method and the `id` included in the url parameters of the request.
  - We need to update the object using the `update_user_book_params`

  <hr/>

</details>
<br/>


### Response
What should the response be to our API request?
- ...
<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  - if update succeeds, the json version of the updated user_book and a 200 status code
  - if not, error messages with 422 status code upon failed validation

  <hr/>

</details>
<br/>


## Users can remove a book from their reading list

We need to be able to send a request from our client application to the API to allow the current user to remove a book from their reading list.

### Request

<details>
  <summary>
    What request method do we need?
  </summary>
  <hr/>

  `DELETE`

  <hr/>

</details>
<br/>

<details>
  <summary>
    What will the path be?
  </summary>
  <hr/>

  `/user_books/:id`

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  NO

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  N/A

  <hr/>

</details>
<br/>

### Route
<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  `delete "/user_books/:id" => user_books#destroy`

  -- or --

  `resources :user_books, only: [:destroy]`

  <hr/>

</details>
<br/>


### Controller
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_books#destroy`

  <hr/>

</details>
<br/>


### Model/Database
<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  Nope!

  <hr/>

</details>
<br/>

<details>
  <summary>
    Any changes needed to the database to support this request?
  </summary>
  <hr/>

  Nope!

  <hr/>

</details>
<br/>

<details>
  <summary>
    What model objects are involved and how do we interact with them in the controller?
  </summary>
  <hr/>

  - We need to find the `UserBook` we're going to delete using the find method with the id included in the request url parameters
  - and then we need to call destroy on that object.

  <hr/>

</details>
<br/>

### Response
<br/>
<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  no content (204 status code) We can get this by leaving off the render.
  
  We can also respond with 200 ok and the deleted record if we want to enable an undo feature from our frontend (we can send a POST request to insert the deleted record again)

  <hr/>

</details>
<br/>

# Phase 4, Lecture 4 - Rails Serializers Exercises

## Reading List Application Features
- When we display the books list, we can display an Add Book button to users who haven't added the book to their reading list and a Remove Book button to users who have already added it.
- When we visit the Book show page, we can also display a list of the book's readers.

Do the following:
- create a `Book` and `BookDetail` serializer. 
- The `BookSerializer` will display a list of books with just the attributes that you choose
- The `BookDetailSerializer` will display those attributes and also the readers of the book

Test your work in Postman or the browser and then if you like, try to boot up this [react client](https://github.com/DakotaLMartinez/reading_list_client) and see if it works!

