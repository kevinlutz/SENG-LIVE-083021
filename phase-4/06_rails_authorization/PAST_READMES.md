# Phase 4 - Lesson 1 - Rails Fundamentals

In this phase we will be building on our knowledge of Ruby and ActiveRecord from Phase 3 to:
- build RESTful APIs with Ruby on Rails
- validate data and return responses with appropriate status codes so that we can give our users more meaningful feedback in API responses
- build applications that include user authentication and access control. 
- deploy our applications so we can share them with friends, family and potential employers

For the application we'll be building together, we'll be working on a meetup clone. The app that you'll be building in exercises is a reading list application. We'll again be adding new features every day, but this time, you'll be working on the app on your own machine day by day. So, you'll want to be keeping up with the work for each day so you'll be ready to participate during the exercise the following day.

## A note about Coding Along

While coding along can be a good way to practice, if you ever feel like you're having trouble coding along AND following along with the conversation we're having in the first part of lecture, I'd recommend focusing on understanding and participating in the conversation. During this phase, I'll be posting a I won't be doing any coding on the rails code in between lectures, and I'll show you how you can use GitHub to view all of the changes we make to the code during a particular lecture.

## What things are different with Rails than they were in Sinatra

- 

## Lesson 1 Todos

### Instructions for Demo

#### 1. Create a new rails application for our reading list application. 
`rails new meetup_clone_api --api --minimal --skip-javascript -T`

Note: Do not forget the --api! The rails application will not be configured correctly if you do! If you forget it, delete the application and re-create it. 
#### 2. Configure cors by uncommenting the `gem 'rack-cors'` and going to `config/initializers/cors.rb` and uncommenting the code below (make sure to replace `'example.com'` with `*` within origins):

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
<details>
  <summary>
    When is CORS necessary? What is it for?
  </summary>
  <hr/>

  Short for Cross Origin Resource Sharing, we need to use CORS when we intend to deploy our rails API application to a separate domain from the React client that will consume its data. If we deploy the API and client to the same domain, CORS will not be necessary to receive the data, because the fetch requests will be coming from the same origin.

  <hr/>

</details>
<br/>


#### 3. Create the following migrations for meetup_clone
![Meetup Clone ERD](../assets/meetup-clone-erd.png)
Note: you do not need to write the tables yourself. There is a way to automatically generate the table with the corresponding columns using rails generators

<details>
  <summary>
    Which resources would you start with here? Why?
  </summary>
  <hr/>

  While there's not really a right answer to this question, it can't hurt to get into a habit and stick to it!
  
  I prefer to start with the parent resources (ones that have child resources that belong to them) as this is the order in which we'll have to create the objects in seed data. Because AR objects that belong to other objects must be created after their parent objects have been saved, I prefer to create the class for the parent object first as well. 

  Both will technically work, but if you create the child resource that belongs to the parent before creating the parent, you'll be unable to save instances of the child until you've created the parent as well.

  <hr/>

</details>
<br/>



<details>
  <summary>
    How do we create a migration for a table that will have foreign key columns to support a belongs_to relationship?
  </summary>
  <hr/>

  We can use the `belongs_to` option when we generate the resource to generate the following:
  - a foreign_key matching the argument
  - an index on the column
  - a null false constraint on the column (to ensure that it has a value)
  - the belongs_to macro added to the model.

```bash
rails g resource UserEvent user:belongs_to event:belongs_to
```

Will generate the following migration:

```rb
class CreateUserEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :user_events do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
```

and the following model:

```rb
class UserEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event
end
```
  <hr/>

</details>
<br/>

#### 4. Go to Models and add the association macros to establish the relationships pictured in the Entity Relationship Diagram (ERD). 
<details>
  <summary>
    What does adding `belongs_to` or `has_many` to a model actually do?
  </summary>
  <hr/>

  - **Defines methods** that handle specific tasks related to associations 
    - Creating an associated object (@post.comments.create)
    - Retrieving all associated objects (@post.comments)
    - finding an associated object (@post.comments.find)
  - Uses convention over configuration to set up SQL queries to support the tasks above. 
    - Key assumptions if a `Post` `has_many :comments`:
      - there is a class called `Comment` (and its associated table is called `comments`)
      - the `comments` table has a foreign key called `post_id`
      - the `posts` table has a primary key called `id`
    - 

  <hr/>

</details>
<br/>

#### 5. In the rails console OR in seeds create seeds for users and groups and test your relationships.
 (You'll want to create groups that are related to users and events that are related to groups, try checking out the [has_many](https://apidock.com/rails/ActiveRecord/Associations/ClassMethods/has_many) docs for examples)

 <details>
  <summary>
    Seeds
  </summary>
  <hr/>

  ```rb
user = User.create(username: 'Dakota', email: 'dakota@dakota.com', bio: 'i love ruby')
user2 = User.create(username: 'Dex', email: 'dex@dex.com', bio: 'i love js')

group = Group.create(name: 'SENG-083021', location: 'everywhere!')

event = user.created_events.create(
  group: group,
  title: 'Rails Fundamentals',
  description: 'migrations generators and fun!',
  start_time: Time.new(2021, 11, 1, 11),
  end_time: Time.new(2021, 11, 1, 13)
)

event.attendees = [user, user2]
```

  <hr/>

</details>
<br/>


#### 6. In `config/routes.rb` Add an index and show route for groups
We'll also want to comment out the resources that have been added so we can ensure we only have routes for the controller actions we've actually built out. 
#### 7. In the groups controller add an index action that renders all of the groups in json. Make a show action that renders 1 group's information given the id
#### 8. Run your rails server and go to the browser (or use postman) to check that your json is being rendered for both routes

Check out the [Exercise Instructions](./EXERCISE.md)

# Phase 4, Lecture 2 - Client Server Communication part 1

Today's focus:

- building out `create` actions in our controllers
- validating user input
- using strong parameters to specify the allowed parameters for post/patch requests
- returning appropriate status codes
- mocking a `current_user` method in our `ApplicationController` that will return the logged in user when we've set up authentication (for now it'll just return the first user in our db)
- Identifying which RESTful action should support a given feature

[RailsGuides on Validations](https://guides.rubyonrails.org/active_record_validations.html) will be important today

## Meetup Clone features list

- As a User, I can create groups
  - groups must have a unique name
- As a User, I can create events
  - events must have a :title, :location, :description, :start_time, :end_time 
  - The title must be unique given the same location and start time
- As a User, I can RSVP to events
  - I can only rsvp to the same event once
- As a User, I can join groups
  - I can only join a group once

Before we hop into coding today, there's a configuration option that we're going to want to change. When we start talking about strong parameters in our controllers, rails is going to do some magic with the params that we pass in via POSTMAN or fetch and add the name of our resource as a key containing all of the attributes we're posting. If we want to disable this feature, we can do so once at the beginning by editing the `config/intializers/wrap_parameters.rb` file. It currently looks like this:

```rb
ActiveSupport.on_load(:action_controller) do
  wrap_parameters format: [:json]
end
```

We'll update it to this:

```rb
ActiveSupport.on_load(:action_controller) do
  wrap_parameters format: []
end
```

We'll also want to add in the `current_user` method to the `ApplicationController` so we can use it later on when we need to create records in the controller that should belong to the logged in user.

```rb
class ApplicationController < ActionController::API
  # ...
  private

  def current_user
    User.first
  end
end
```

We can open up the rails console and check `User.first` to confirm that we actually have a User in our database that this method will return.

## Reminder of MVC Flow

![MVC Flow with Serializers](../assets/mvc-with-serializers.png) 

Shoutout to Greg Dwyer for sharing this with me! 

This diagram gives a good sense of the separation of concerns and how to distinguish between the roles of different parts of our application. 

I'm going to add a couple of diagrams below that will focus on our workflow as developers. We won't have serializers until Lecture 4, but we will be adding validations today, and I've got a diagram I'll share for those as well.

## My Process for Building out features
If this is what the Request/Response flow looks like when we interact with our API using a React client application:

![MVC Flow](../assets/mvc-flow.png)

Then, for each feature I want to figure out what request(s) are necessary to support the feature and what the response should be. From there, we can split the feature into tasks by asking what needs to change in our routes, controller and model layers in order to generate the required response from the request.
### Request

What will the fetch request look like? (Method, endpoint, headers, and body)
### Route

What route do we need to match that request? which controller action will respond?

### Controller

What needs to happen within our controller action? Are there relevant params for this request? If it's a POST or PATCH request, we're most likely going to want to do mass assignment, so what parameters should we allow within our strong params?

### Model (database)

Are there any model methods that need to be defined to support the request? (Are there any inputs from the user that don't exactly match up with columns in the associated database table?)

What validations do we need to add to ensure the we're not allowing users to add invalid or incomplete data to our database?

### Response

Depending on how our validations go, how should our controller action respond to the request? What should be included in the json? What should the status code be?

## A note about Status Codes

| Codes | Meaning | Usage |
|---|---|---|
| 200-299 | OK Response | used to indicate success (200 is OK, 201 is created, 204 is no content) |
| 300-399 | Redirect | used mainly in applications that do server side rendering (not with a react client) to indicate that the server is responding to the request by generating another request |
| 400-499 | User Error | Used to indicate some problem with the request that the user sent. (400 is bad request, 401 is unauthorized, 403 is forbidden, 404 is not found,...) |
| 500-599 | Server Error | Used to indicate that a request generated an error on the server side that needs to be fixed. When we see this during development, we need to check out network tab and rails server logs for a detailed error message. |

See [railsstatuscodes.com](http://www.railsstatuscodes.com/) for a complete list with the corresponding symbols.

The status code in the response allows us to indicate to the frontend whether or not the request was a success. The way that we interact with the status code from our client side code is by working with the [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) that fetch returns a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for.

#### Example

Fetch returns a promise for a response object. The first callback that we pass to `then` to consume that resolved promise value takes that response object as an argument. That response object has a status code and a body that we can read from.  When we do `response.json()` in the promise callback, we're parsing the body of the response from JSON string format to the data structure that it represents. The response object also has an `ok` property that indicates that the status code is between 200-299

```js
fetch('http://localhost:3000/groups', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }, 
  body: JSON.stringify({name: "Online Software Engineering 071921"})
})
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      return response.json().then(errors => Promise.reject(errors))
    }
  })
  .then(groups => {
    console.log(groups) // happens if response was ok
  })
  .catch(errors => {
    console.error(errors) // happens if response was not ok
  })
```

If the response status is not in the 200-299 range, then ok will be false, so we'll want to return a rejected Promise for the response body parsed as json. We can then attach a catch callback to handle adding an error to state after it's caught by the catch callback.

Let's make another version of the mvc-flow diagram that includes validations.

![mvc flow with validations using create and valid?](../assets/mvc-flow-with-validations-create-and-valid.png)

You will sometimes see controllers use `.new` and then `.save` instead of `.create` and then `.valid?`, so I've included a diagram illustrating the difference below:

![mvc flow with validation using new and save](../assets/mvc-flow-with-validations.png)

## Users must provide a unique name when creating a group

### Request

<details>
<summary>What request method do we need? (GET/POST/PATCH/DELETE?)</summary>
<hr/>
POST
<hr/>
</details>
<br/>
<details>
<summary>
What will the path be?
</summary>
<hr/>
/groups

<hr/>

</details>

<br/>

<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  YES! Whenever we have a body in our fetch request, we need to add the Content-Type header to indicate that the body is formatted as JSON not formdata.

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  Yes, it must include a key value pair including the name of the group.

  ```js
  {
    name: 'Online Software Engineering 083021'
  }
```

  <hr/>

</details>
<br/>

<details>
  <summary>
    Request Example
  </summary>
  <hr/>

  POST '/groups'
```js
fetch(`http://localhost:3000/groups`,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name: 'Online Software Engineering 083021'})
})
```

For Postman

```
{
  "name": "Online Software Engineering 071921"
}
```

  <hr/>

</details>
<br/>


### Route

<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  ```rb
resources :groups, only: [:create]
# or
post '/groups', to: 'groups#create'
```

  <hr/>

</details>
<br/>


### Controller

<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `groups#create`

  ```rb
class GroupsController < ApplicationController
  # ...
  def create 
    byebug
  end

  # ...

  private 

  def group_params
    params.permit(:name, :location)
  end
end
```

  <hr/>

</details>
<br/>


### Model/Database

<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  Yup! We need to add a validation to the name to make sure that it is both present and unique.

  ```rb
class Group < ApplicationRecord
  # ...
  validates :name, presence: true, uniqueness: true
end
```

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

  We'll be calling the `create` method with the `group_params` as an argument so that we can persist the data coming in from the client. We'll also need to check whether or not the object is valid so we can include a status code indicating whether a validation error occurred.

  <hr/>

</details>
<br/>



### Response

<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  We want our API to check if we've successfully created a group or if some validation error prevented the save. 
  
  We'll respond with a 201 status code (created) to indicate success. 
  
  If there is a problem, we'll return a 422 status code (unprocessable_entity) to indicate that validation errors have occurred and we need to respond differently on the client.

  To do this, we'll need to add some conditional logic to the create action:

```rb
class GroupsController < ApplicationController
  # ...
  def create 
    group = Group.create(group_params)
    if group.valid?
      render json: group, status: :created # 201 status code
    else
      render json: group.errors, status: :unprocessable_entity # 422 status code
    end
  end

  # ...

  private 

  def group_params
    params.permit(:name, :location)
  end
end
```

  <hr/>

</details>
<br/>


### How do we Test this?

Send the request twice to confirm that the creation works the first time and the uniqueness validation works the second time to prevent creation of a duplicate.

## Users must provide a :title, :location, :description, :start_time, :end_time when creating an event

### Request

<details>
<summary>What request method do we need? (GET/POST/PATCH/DELETE?)</summary>
<hr/>
POST
<hr/>
</details>
<br/>
<details>
<summary>
What will the path be?
</summary>
<hr/>
/events

<hr/>

</details>

<br/>

<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  YES! Whenever we have a body in our fetch request, we need to add the Content-Type header to indicate that the body is formatted as JSON not formdata.

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  Yes, it must include the title, description, location, start_time, end_time and group_id of the event we're going to create.

  ```js
  {
    title: 'Rails Client/Server Communication part 1',
    description: 'Validations, strong parameters, mass assignment, status codes and the create action',
    location: 'online',
    start_time: "2021-09-21T11:00:00",
    end_time: "2021-09-21T13:00:00",
    group_id: 1
  }
```

  <hr/>

</details>
<br/>

<details>
  <summary>
    Request Example
  </summary>
  <hr/>

  POST '/events'
```js
fetch('http://localhost:3000/events',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Rails Client/Server Communication part 1',
    description: 'Validations, strong parameters, mass assignment, status codes and the create action',
    location: 'online',
    start_time: "2021-09-21T11:00:00",
    end_time: "2021-09-21T13:00:00",
    group_id: 1
  })
})
```

For postman:

```json
{
  "title": "Rails Client/Server Communication part 1",
  "description": "Validations, strong parameters, mass assignment, status codes and the create action",
  "location": "online",
  "start_time": "2021-09-21T11:00:00",
  "end_time": "2021-09-21T13:00:00",
  "group_id": 1
}
```

Just make sure that the group_id value corresponds to an existing group in your database.

  <hr/>

</details>
<br/>


### Route

<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  ```rb
resources :events, only: [:create]
# or
post '/events', to: 'events#create'
```

  <hr/>

</details>
<br/>


### Controller

<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `events#create`

  ```rb
class EventsController < ApplicationController
  # ...
  def create 
    byebug
  end

  # ...

  private 

  def event_params
    params.permit(:title, :description, :location, :start_time, :end_time, :group_id)
  end
end
```

  <hr/>

</details>
<br/>


### Model/Database

<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  Yup! We need to add a validation to the title, description, location, start_time and end_time to make sure that it is present. 
    
We will also want to add a uniqueness validation to the title and scope it to the location and start time so that we can't add an event that has the same title at the same location and start time.

  ```rb
class Event < ApplicationRecord
  # ... 
  validates :title, :description, :location, :start_time, :end_time, presence: true
  validates :title, uniqueness: { scope: [:location, :start_time]}
end
```

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

  We'll be calling the `create` method with the `event_params` as an argument so that we can persist the data coming in from the client. We'll also need to check whether or not the object is valid so we can include a status code indicating whether a validation error occurred.

  <hr/>

</details>
<br/>



### Response

<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  We want our API to check if we've successfully created an event or if some validation error prevented the save. 
  
  We'll respond with a 201 status code (created) to indicate success. 
  
  If there is a problem, we'll return a 422 status code (unprocessable_entity) to indicate that validation errors have occurred and we need to respond differently on the client.

  To do this, we'll need to add some conditional logic to the create action:

```rb
class EventsController < ApplicationController
  # ...
  def create 
    event = current_user.created_events.create(event_params)
    if event.valid?
      render json: event, status: :created # 201 status code
    else
      render json: event.errors, status: :unprocessable_entity # 422 status code
    end
  end

  # ...

  private 

  def event_params
    params.permit(:title, :description, :location, :start_time, :end_time, :group_id)
  end
end
```

  <hr/>

</details>
<br/>


### How do we Test this?

Send the request twice to confirm that the creation works the first time and the uniqueness validation works the second time to prevent creation of a duplicate.

## Users can RSVP to events (one RSVP per user)

### Request

<details>
<summary>What request method do we need? (GET/POST/PATCH/DELETE?)</summary>
<hr/>
POST
<hr/>
</details>
<br/>
<details>
<summary>
What will the path be?
</summary>
<hr/>
/user_events

<hr/>

</details>

<br/>

<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  YES! Whenever we have a body in our fetch request, we need to add the Content-Type header to indicate that the body is formatted as JSON not formdata.

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  Yes, it must include the event_id of the UserEvent we're going to create.

  ```js
  {
    event_id: 1
  }
```
    
    When we get to our controller later on, all of the keys in our request body must be included in our strong parameters so they are permitted to pass into the `.create` method.

  <hr/>

</details>
<br/>

<details>
  <summary>
    Request Example
  </summary>
  <hr/>

POST '/user_events'
  ```js
fetch('http://localhost:3000/user_events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_id: 1
      })
})
```

For postman

```json
{
  "event_id": 1
}
```

  <hr/>

</details>
<br/>


### Route

<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

```rb
resources :user_events, only: [:create]
# or 
post '/user_events', to: 'user_events#create'
```

  <hr/>

</details>
<br/>


### Controller

For this functionality, users will only be able to add themselves to an event at the moment, so our API will need a way of knowing which user is making the request. Next week, we'll learn about how to do this for real, but for now, we're going to use the method called `current_user` in our application controller that just returns one of the users we created within the `db/seeds.rb` file. 

If we need to simulate being logged in as another user, we can update the `current_user` method to return the user we want to switch to. We'll replace this method later, but for now it will help us to build out functionality on the server that requires knowledge of the currently logged in user without actually having authentication set up yet. Within the other controller, we'll use the current_user method to build the associated object.

<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_events#create`

  ```rb
class UserEventsController < ApplicationController
  # ...
  def create
    byebug
  end

  # ...
  private

  def user_event_params
    params.permit(:event_id)
  end
end
```

  <hr/>

</details>
<br/>


### Model/Database

<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  Yup! We need to add a uniqueness validation to the `event_id` and scope it to the `user_id` so that the same user can't rsvp to the same event more than once. We can set this one up the other way as well (validating uniqueness of `user_id` within the scope of the `event_id`), but we're going with this way because `event_id` is the attribute that our users will actually be changing.

```rb
class UserEvent < ApplicationRecord
  # ...

  validates :event_id, uniqueness: { scope: :user_id }
end
                                   
```                            

In this case, the error message we get will be "event_id is already taken" which is less clear than it could be. So we can customize the error message by adding another option to the hash we pass to uniqueness.

```rb
class UserEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :event_id, uniqueness: { scope: :user_id, message: "Can't rsvp for the same event twice" }
end
```

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

  We'll be calling the `create` method with the `user_event_params` as an argument so that we can create a new instance of `UserEvent` and persist the data coming in from the client. We'll also need to check whether or not the object is valid so we can include a status code indicating whether a validation error occurred.

  <hr/>

</details>
<br/>



### Response

<details>
  <summary>
    What should the response be to our API request? (What possible status codes?)
  </summary>
  <hr/>

  We want our API to check if we've successfully created the `UserEvent` or if some validation error prevented the save. 
  
  We'll respond with a 201 status code (created) to indicate success. 
  
  If there is a problem, we'll return a 422 status code (unprocessable_entity) to indicate that validation errors have occurred and we need to respond differently on the client.

  To do this, we'll need to add some conditional logic to the create action:

```rb
class UserEventsController < ApplicationController
  # ...
  def create
    user_event = current_user.user_events.create(user_event_params)
    if user_event.valid?
      render json: user_event, status: :created # 201 status code
    else 
      render json: user_event.errors, status: :unprocessable_entity # 422 status code
    end 
  end

  # ...
  private

  def user_event_params
    params.permit(:event_id)
  end
end
```

  <hr/>

</details>
<br/>


### How do we Test this?

Send the request twice to confirm that the creation works the first time and the uniqueness validation works the second time to prevent creation of a duplicate.

## Users can join other groups

### Request

<details>
<summary>What request method do we need? (GET/POST/PATCH/DELETE?)</summary>
<hr/>
POST
<hr/>
</details>
<br/>
<details>
<summary>
What will the path be?
</summary>
<hr/>
/user_groups

<hr/>

</details>

<br/>

<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  YES! Whenever we have a body in our fetch request, we need to add the Content-Type header to indicate that the body is formatted as JSON not formdata.

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  Yes, it must include the `group_id` of the `UserGroup` we're going to create.

  ```js
  {
    group_id: 1
  }
```
    
    When we get to our controller later on, all of the keys in our request body must be included in our strong parameters so they are permitted to pass into the `.create` method.

  <hr/>

</details>
<br/>

<details>
  <summary>
    Request Example
  </summary>
  <hr/>

POST '/user_groups'
```js
fetch('http://localhost:3000/user_groups', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    group_id: 1
  })
})
```

For postman

```json
{
  "group_id": 1
}
```

  <hr/>

</details>
<br/>


### Route

<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

```rb
resources :user_groups, only: [:create]
# or 
post '/user_groups', to: 'user_groups#create'
```

  <hr/>

</details>
<br/>


### Controller

<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_groups#create`

```rb
class UserGroupsController < ApplicationController
  # ...
  def create
    byebug
  end

  # ...
  private

  def user_group_params
    params.permit(:group_id)
  end
end
```

  <hr/>

</details>
<br/>


### Model/Database

<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  Yup! We need to add a uniqueness validation to the `group_id` and scope it to the `user_id` so that the same user can't join the same group more than once. We can set this one up the other way as well (validating uniqueness of `user_id` within the scope of the `group_id`), but we're going with this way because `group_id` is the attribute that our users will actually be changing.

```rb
class UserGroup < ApplicationRecord
  # ...

  validates :group_id, uniqueness: { scope: :user_id }
end
```                       

In this case, the error message we get will be "event_id is already taken" which is less clear than it could be. So we can customize the error message by adding another option to the hash we pass to uniqueness.

```rb
class UserEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :event_id, uniqueness: { scope: :user_id, message: "Can't rsvp for the same event twice" }
end
```

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

  We'll be calling the `create` method on `current_user.user_groups` with the `user_group_params` as an argument so that we can create a new instance of `UserGroup` and persist the data coming in from the client. We'll also need to check whether or not the object is valid so we can include a status code indicating whether a validation error occurred.

  <hr/>

</details>
<br/>



### Response

<details>
  <summary>
    What should the response be to our API request? (What possible status codes?)
  </summary>
  <hr/>

  We want our API to check if we've successfully created the `UserGroup` or if some validation error prevented the save. 
  
  We'll respond with a 201 status code (created) to indicate success. 
  
  If there is a problem, we'll return a 422 status code (unprocessable_entity) to indicate that validation errors have occurred and we need to respond differently on the client.

  To do this, we'll need to add some conditional logic to the create action:

```rb
class UserGroupsController < ApplicationController
  # ...
  def create
    user_group = current_user.user_groups.create(user_group_params)
    if user_group.save
      render json: user_group, status: :created # 201 status code
    else 
      render json: user_group.errors, status: :unprocessable_entity # 422 status code
    end 
  end

  # ...
  private

  def user_group_params
    params.permit(:group_id)
  end
end
```

  <hr/>

</details>
<br/>


### How do we Test this?

Send the request twice to confirm that the creation works the first time and the uniqueness validation works the second time to prevent creation of a duplicate.

After a break, we'll start our [exercise on the Reading list application](./EXERCISE.md)

# Phase 4 - Lecture 3 Client/Server Communication part2

## Today's Topics

- Adding Update/Delete functionality to our API to complete full CRUD
- How to write add column migrations
- Practicing how to break down feature requirements into the RESTful API endpoints they require

### Update Flow

The update flow is quite similar to create with a couple of key differences:
- We need a url parameter to find the relevant record first
- We call update instead of valid?

![Update Flow](../assets/mvc-flow-with-validations-update.png)

### Delete Flow

The delete pattern is similar to update at first and then simpler in the controller. 
- We again need a url parameter to find the relevant record first
- We call destroy on it instead of update (no argument required)

![Delete Flow](../assets/mvc-flow-delete.png)

### Features for Meetup Clone

- Users can delete an event they created
- Users can leave a group
- Users who rsvp'd to an event can delete their RSVP
- Users can update an event they created
- Users can update whether a user attended an event

### Features for Reading List Application

- Users can update whether or not they have read a book
- Users can remove a book from their reading list

Again, we'll be breaking down the functionality into pieces, starting with the request, going through route, controller, model and leading to a response. Today, I'll be asking for more input from you all about what the RESTful requests should be to support these features.

# Meetup Clone Features

## Users can delete an event they created

### Request

<details>
  <summary>
    What request method do we need? GET/POST/PATCH or DELETE?
  </summary>
  <hr/>
  DELETE
  <hr/>
</details>
<br />

<details>
  <summary>
    What will the path be?
  </summary>
  <hr/>

  `/events/:id`

  <hr/>

</details>

<br/>
<details>
  <summary>
    Do we need the content-type header? 
  </summary>
  <hr/>

  NO

  <hr/>

</details>


<br/>
<details>
  <summary>
    Do we need a body? If so what will it look like?
  </summary>
  <hr/>

  N/A

  <hr/>

</details>
<br/>

### Route
<br/>
<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  ```rb
  resources :events, only: [:destroy]
  ```

  <hr/>

</details>
<br/>

### Controller
<br/>
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `events#destroy`

  <hr/>

</details>
<br/>

### Model/Database
<br/>
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

  - We need to find the event object we're going to delete using the find method with the id included in the request url parameters.
  - We need to call destroy on that object.

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

  ```rb
  def destroy
    event = Event.find(params[:id])
    event.destroy
  end
  ```
  no content (204 status code) We can get this by leaving off the render. We can also explicitly set the status code like so:

  ```rb
  def destroy
    event = Event.find(params[:id])
    event.destroy
    head :no_content
  end
```
  
   We could also respond with 200 ok and the deleted record if we want to enable an undo feature from our frontend (we can store the response body from the DELETE request in state and then upon clicking an undo button use the stored data as the request body of the POST request to insert the deleted record again)
  ```rb
  def destroy
    event = Event.find(params[:id])
    event.destroy
    render json: event
  end
  ```
  <hr/>

</details>
<br/>


## Users who rsvp'd to an event can delete their RSVP

### Request
<details>
  <summary>
    What request method do we need? GET/POST/PATCH or DELETE?
  </summary>
  <hr/>
  DELETE
  <hr/>
</details>
<br />

<details>
  <summary>
    What will the path be?
  </summary>
  <hr/>

  `/user_events/:id `

  <hr/>

</details>

<br/>
<details>
<summary>
Do we need the content-type header?
</summary>
<hr/>

NO

<hr/>

</details>


<br/>
<details>
  <summary>
    Do we need a body? If so what will it look like?
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

  `resources :user_events, only: [:destroy]`

  <hr/>

</details>
<br/>

### Controller
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_events#destroy`

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

  - We need to find the `UserEvent` we're going to delete using the find method and the id included in the url parameters of the request. 
  - Then we need to call destroy on that object.

  <hr/>

</details>
<br/>



### Response
<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  ```rb
    def destroy
      user_event = UserEvent.find(params[:id])
      user_event.destroy
    end
  ```

  None needed. If we just leave out the render method, we'll send a 204 no content response by default. We can explicitly send the 204 no content response by adding

  ```rb
  head :no_content
  ```

  <hr/>

</details>
<br/>

## Users can leave a group

### Request

<details>
  <summary>
    What request method do we need? GET/POST/PATCH or DELETE?
  </summary>
  <hr/>
  DELETE
  <hr/>
</details>
<br />

<details>
  <summary>
    What will the path be?
  </summary>
  <hr/>

  `/user_groups/:id`

  <hr/>

</details>

<br/>
<details>
  <summary>
    Do we need the content-type header? 
  </summary>
  <hr/>

  NO

  <hr/>

</details>


<br/>
<details>
  <summary>
    Do we need a body? If so what will it look like?
  </summary>
  <hr/>

  N/A

  <hr/>

</details>
<br/>

### Route
<br/>
<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  ```rb
  resources :user_groups, only: [:destroy]
  ```

  <hr/>

</details>
<br/>

### Controller
<br/>
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_groups#destroy`

  <hr/>

</details>
<br/>

### Model/Database
<br/>
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

  - We need to find the `UserGroup` we're going to delete using the find method with the id included in the request url parameters
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

  ```rb
  user_group = UserGroup.find(params[:id])
  user_group.destroy
  ```

  no content (204 status code) We can get this by leaving off the render.
  
  We can also respond with 200 ok and the deleted record if we want to enable an undo feature from our frontend (we can send a POST request to insert the deleted record again)

  <hr/>

</details>
<br/>


## Users can update an event they created

### Request
<details>
  <summary>
    What request method do we need? GET/POST/PATCH or DELETE?
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

  `/events/:id`

  <hr/>

</details>
<br/>


<details>
  <summary>
    Do we need the Content-Type header?
  </summary>
  <hr/>

  YES because we have a JSON body

  <hr/>

</details>
<br/>

<details>
  <summary>
    Do we need a body? If so, what will it include?
  </summary>
  <hr/>

  YES
  - :title
  - :description
  - :location
  - :start_time
  - :end_time
  - :group_id

  To see what these things should be, we can take a look at the corresponding database table in our schema and think about which things a user should be able to edit directly. We can also check the strong parameters in the corresponding controller.

  <hr/>

</details>
<br/>

### Route
<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  `patch "/events/:id" => events#update`

  -- or --

  `resources :events, only: [:update]`

  <hr/>

</details>
<br/>

### Controller
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `events#update`

  <hr/>

</details>
<br/>

### Model/Database

<details>
  <summary>
    Any changes needed to model layer (methods/validations/etc.)?
  </summary>
  <hr/>

  None

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

  - We need to find the event whose id appears in the url parameters of the request
  - We need to try to update that event with the `event_params`

  <hr/>

</details>
<br/>



### Response
<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  - if update succeeds, the json version of the updated event and a 200 status code
  - if not, error messages with 422 status code upon failed validation

   ```rb
  def update
      event = Event.find(params[:id])
      if event.update(event_params)
        render json: event, status: :ok
      else
        render json: event.errors, status: :unprocessable_entity
      end
    end
  ```

  <hr/>

</details>
<br/>




## Users can update whether a user attended an event

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

  `/user_events/:id`

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

- YES
    - event_id
    - attended (boolean)

This could be debatable to an extent.  If we're updating an RSVP, would it make sense to change the event the rsvp belongs to or simply to focus on whether they attended or not? If we decided we only want to allow updating of the attended attribute, what change would we need to make?
  <hr/>

</details>
<br/>

### Route
<details>
  <summary>
    What route do we need?
  </summary>
  <hr/>

  `patch '/user_events/:id', to: 'user_events#update'`

  -- or --

  `resources :user_events, only: [:update]`

  <hr/>

</details>
<br/>

### Controller
<details>
  <summary>
    Which controller action(s) do we need?
  </summary>
  <hr/>

  `user_events#update`

  <hr/>

</details>
<br/>

<details>
  <summary>
    Can we use our strong parameters from create or is update different for some reason?
  </summary>
  <hr/>

  In this case, we probably don't want to allow `event_id` through when doing an update, so we'll need a separate method for `update_user_event_params` here to only permit `attended` to be updated.

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

  YES! We don't currently have an attended column in the user_events table, so we'll need to add that.

  <hr/>

</details>
<br/>



<details>
  <summary>
    What model objects are involved and how do we interact with them in the controller?
  </summary>
  <hr/>

  - We need to find the `UserEvent` object to update by using the find method with the id including in the url parameters of the request.
  - We need to call update on that object and pass only the attended parameter (using strong_params)

  ```rb
  def update_user_event_params
    params.permit(:attended)
  end
  ```

  <hr/>

</details>
<br/>


### Response
<details>
  <summary>
    What should the response be to our API request?
  </summary>
  <hr/>

  - if update succeeds, the json version of the updated user_event and a 200 status code
  - if not, error messages with 422 status code upon failed validation

  ```rb
  def update
    user_event = UserEvent.find(params[:id])
    if user_event.update(update_user_event_params)
      render json: user_event, status: :ok
    else
      render json: user_event.errors, status: :unprocessable_entity
    end
  end
  ```

  <hr/>

</details>
<br/>



## Bonus Content
### Nested resources and Searching with Scope Methods + Query Parameters

```rb
# I don't get everything, but I see maybe the 10 most recent comments 
# GET '/books/:id' 

# all comments on book with id of params[:book_id]
# GET '/books/:book_id/comments' 

# add this book to a user's reading list without needing a body (params[:book_id]) from the url will take its place
# POST '/books/:book_id/user_books' 

# GET '/books' allows you to make a request that has url parameters like this:
# http://localhost:3000/books?author=Malcolm+Gladwell'

# resources :posts do 
#   resources :comments
# end

# resources :users do 
#   resources :user_books, only: [:index]
# end

#get '/users/:user_id/user_books', to: "user_books#index"
```

Chaining scopes

```rb
class Book
  def self.search(options)
    results = self.all
    allowed_options = ["author", "publication_year"]
    allowed_options.each do |option|
      if options['option']
        results = results.where(option: options['option'])
      end
    end
    results
  end
end
```

```rb
class BooksController
  def index
    render json: Post.search(params)
  end
end
```

Open up `http://localhost:3000/books?author=Malcolm+Gladwell` and we should see all books by Malcolm Gladwell

# Phase 4 - Lecture 4: Rails Serializers

Today's focus: 

- Customizing the JSON rendered by the API to support client side features.

## Key Features

### Meetup Clone

- When we display the groups list, we can display a Join Group button to users who haven't joined a group and a Leave Group button to users who have joined the group.
- When we visit the group show page, we can also display a list of the group's members and its events.
- When we display the events list, we can display an RVSP for Event button to those who haven't already rsvp'd and a Cancel RSVP button to those who have.
- When we visit the show (detail) page for an event, we also want to have access to the attendees, the creator of the event, and the group that the event belongs to (as a link)

## Necessary configuration for AMS (ActiveModel Serializers)

```bash
bundle add active_model_serializers
```
Make sure when you do this that you don't already have a running rails server!

Once you've installed this gem, Rails will use a serializer matching the model name to convert an object to JSON by default.

```rb
render json: Post.first
# will use the
PostSerializer 
# by default (if it exists) without 
# any additional configuration
```

If we want to have two different serializers for the same model in different situations (index vs show for example) we can specify which serializer should be used explicitly.
The option for overriding the default serializer for a collection is called `each_serializer` while it's called `serializer` for a single record.

```rb
def index
  render json: Post.all, each_serializer: PostIndexSerializer
end

def show
  render json: Post.find(params[:id])
end
```
We'll also want to use the serializer generator to make serializers for our model objects.

```bash
rails g serializer PostIndex id title author_name
rails g serializer Post
```

```rb
# app/serializers/post_index_serializer.rb
class PostIndexSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_name
end
```

```rb
# app/serializers/post_serializer.rb
class PostSerializer < PostIndexSerializer
  has_many :comments
end
```

This will allow us to include the comments when we retrieve a post from the api using its id, while leaving them out when we retrieve all of the posts from the index endpoint.

We can also approach the same problem from the other direction:

```bash
rails g serializer Post id title author_name
rails g serializer PostDetail
```

```rb
class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :author_name
end

class PostDetailSerializer < PostSerializer
  has_many :comments
end
```

And then in the controller:

```rb
def index
  render json: Post.all
end

def show
  render json: Post.find(params[:id]), serializer: PostDetailSerializer
end
```

This way is preferable as we don't have to use the `each_serializer` option and the default serializer for our models will be the most basic (requiring us to explicitly specify a serializer if we want *more* information rather than *less*)

## Leave Group/Join Group Button on Groups Index view

<details>
  <summary>
    Which endpoint am I hitting to retrieve data for this view?
  </summary>
  <hr/>

  ```rb
  get '/groups', to: 'groups#index'
  ```
  --- or ---
  ```rb
  resources :groups, only: [:index]
  ```

  <hr/>

</details>
<br/>



<details>
  <summary>
    1. What data do I need from that particular api endpoint to support the features on this part of my client application?
  </summary>
  <hr/>

  - I need the group's id, name and location
  - I also need an associated user_group belonging to the current user 
      - if the current user has joined the group, there will be one and I can show a button to leave the group (deleting the user_group)
      - if there is no user_group belonging to this group and the current user, I can show a join group button instead
  

  <hr/>

</details>
<br/>


<details>
  <summary>
    2. How is that data accessible to me from the API? What attributes, methods, or related objects do I need to serialize so that the client side has the information it needs to display the proper UI?
  </summary>
  <hr/>

  - attributes are accessible directly
  - I need to add a method to the serializer that will look through the current user's user_groups to see if one has the same group_id as this group, the method will return either that or nil..

  <hr/>

</details>
<br/>


## Group Detail Page should show members and events

<details>
  <summary>
    Which endpoint am I hitting to retrieve data for this view?
  </summary>
  <hr/>

  ```rb
  GET '/groups/:id', to: 'groups#show'
  ```
  --- or ---

  ```rb
  resources :groups, only: [:show]
  ```



  <hr/>

</details>
<br/>

<details>
  <summary>
    1. What data do I need from a particular api endpoint to support the features on this part of my client application?
  </summary>
  <hr/>

  I need to include members and events

  <hr/>

</details>
<br/>


<details>
  <summary>
    2. How is that data accessible to me from the API? What attributes, methods, or related objects do I need to serialize so that the client side has the information it needs to display the proper UI?
  </summary>
  <hr/>

  - `has_many :members`
  - `has_many :events`
  >note: I don't need to add through in the serializer even though the group has many members through user_groups

  <hr/>

</details>
<br/>


## RSVP to Event/Cancel RSVP button on Events Index view

<details>
  <summary>
    Which endpoint am I hitting to retrieve data for this view?
  </summary>
  <hr/>

  ```rb
  get '/events', to: 'events#index'
  ```
  --- or ---
  ```rb
  resources :events, only: [:index]
  ```

  <hr/>

</details>
<br/>

<details>
  <summary>
    1. What data do I need from a particular api endpoint to support the features on this part of my client application?
  </summary>
  <hr/>

  - I need the key attributes, :id, :title, :description, :location, :start_time, :end_time
  - I also may want to convert the start and end times to something a bit more human readable for my client app
  - if the current user has a user_event belonging to this event, I need to return it to the client:
    - if it's there, I can show a button to cancel the RSVP (delete the user_event)
    - if it's not, I can show a button to RSVP to the event

  <hr/>

</details>
<br/>


<details>
  <summary>
    2. How is that data accessible to me from the API? What attributes, methods, or related objects do I need to serialize so that the client side has the information it needs to display the proper UI?
  </summary>
  <hr/>

  - attributes are directly accessible
  - we can add a time method that will combine the start and end times into a more human readable format
```rb
  def time
    "From #{object.start_time.strftime('%A, %m/%d/%y at %I:%m %p')} to #{object.end_time.strftime('%A, %m/%d/%y at %I:%m %p')}"
  end
```
  - we can add a `user_event` method that will look through all of the current user's user_events to see if one matches the event we're serializing. If it does, return it, if not return nil.

  <hr/>

</details>
<br/>


## Event Detail View should show attendees, event creator and a link to the group the event belongs to

<details>
  <summary>
    Which endpoint am I hitting to retrieve data for this view?
  </summary>
  <hr/>
  
  ```rb
  get '/events/:id', to: 'events#show'
  ```
  --- or ---
  ```rb
  resources :events, only: [:show]
  ```

  <hr/>

</details>
<br/>

<details>
  <summary>
    1. What data do I need from a particular api endpoint to support the features on this part of my client application?
  </summary>
  <hr/>

  - I need all the same attributes as for index, :id, :title, :description, :location, :start_time, :end_time
  - I also want to include the associated group
  - I want the attendees as well as the username of the creator that the event belongs to

  <hr/>

</details>
<br/>


<details>
  <summary>
    2. How is that data accessible to me from the API? What attributes, methods, or related objects do I need to serialize so that the client side has the information it needs to display the proper UI?
  </summary>
  <hr/>

  - attributes and formatted time I can get through inheritance with the index serializer
  - I can add belongs_to :group (with another serializer specified so I only include the id and name of the group needed to construct the link instead of all the groups members and such)
  - I can add a method called creator that will return the username of the user that this event belongs to
  - I can add `has_many :attendees` to include the users who have rsvp'd to the event.

  <hr/>

</details>
<br/>

After we're done with this, we can test out the [react client](git@github.com:DakotaLMartinez/083021_meetup_clone_client.git) and see if it works!

# Phase 4 - Lecture 5: Rails Authentication

- We'll be adding auth to the Meetup clone in part 1. The react client has been updated, if you're coding along and want to run it alongside the backend as we update it, pull down the [meetup clone client repo](https://github.com/DakotaLMartinez/080921_meetup_clone_client). 
- When we get to the exercise, you can pull down the [reading list client repo](https://github.com/DakotaLMartinez/reading_list_client) to test it out. Only change is that the mocked currentUser has been reset to null so we can test out auth for real.
- Key Authentication Concepts for the day:
    - Sessions
    - Cookies
    - Password Security

## Sessions, Cookies and the Hotel Keycard analogy

- book a reservation -> signup for account
- check in at front desk -> login to account
- key card -> cookie
- card reader -> session
## Endpoints
These are the 4 endpoints we'll need to add to support authentication in our applications.
| Endpoint | Purpose | params |
|---|---|---|
| get '/me' | returns the currently logged in user or 401 unauthorized if none exists. Used to determine whether to load the `AuthenticatedApp` or `UnauthenticatedApp` | none |
| post '/login' | returns the newly logged in user | username and password |
| post '/signup' | returns the newly created (and logged in) user | username, password, and password_confirmation |
| delete '/logout' | removes the user_id from the session cookie | none |
## Checking for authentication with `GET '/me'`
![checking for authentication](../assets/check-authentication.png)

- We'll be using this endpoint from the frontend to determine when the user is logged in and when they're not
  - If we get an OK response, we have a logged in user
  - If we don't, that means we don't have a currently logged in user.
## Logging in with `POST '/login'`

![Login flow](../assets/login.png)

- This endpoint will be used to handle a login form submission from the client application.
  - If we get an OK response, the user's id is stored in the encrypted session cookie, logging them in and allowing access to the logged in version of the react application with that user's data. In React, we'll store the user we get back from logging in within the currentUser piece of state.
  - If we don't, we'll be able to tell the user that they presented invalid credentials in the form.
## Signing Up with `POST '/signup'`

![Signup flow](../assets/signup.png)

- This endpoint will be used to handle the signup form submission from the client application.
  - If we get an OK response, the newly registered user'd id will be stored in the encrypted session cookie, logging them in and allowing access to the logged in version of the react application with that user's data. In React, we'll store the user we get back from signing up within the currentUser piece of state.
  - If we don't, we'll be able to display validation errors to the user and allow them to submit the form again.
## Logging Out with `DELETE '/logout'`

![Logout flow](../assets/logout.png)

- This endpoint will be used to handle clicking on the logout button from the client application.
  - If we get an OK response, the user's id will be removed from the session cookie, logging them out and sending them back to the logged out version of the react application. In React, we'll set the currentUser to `null` so we get the logged out experience.
  - The only reason we wouldn't get an OK response is if we sent this request and we weren't already logged in. We can add error handling here, but we shouldn't actually need it.

## React Support for Authentication

![React authentication flow](../assets/react-app-flow.png)

- The basic strategy here is to have two different top level components.
  - One for logged in users 
  - and one for non-logged in users.
- We'll render nothing until we've checked for a logged in user.
- Then we'll check to see that someone is logged in 
  - If we have a logged in user (based on the contents of our session cookies) we'll show the logged-in version of the app
  - If we don't, we'll show a non-logged in version of the app (in our case we'll just have routes for signing up and logging in, but you could also have a landing page route, for example)

# Plan of Attack

Because Authentication in a web application involves a set of related features, rather than an individual feature of the application, we'll be splitting our tasks into layers but in a different way than we have so far. Instead of starting with the requests and then building out the routes, controller actions, database and model changes and finally the responses, we'll start by building out the backend foundational changes(dependency, configuration, model & database) that required to support authentication. Then, we'll fill in the routes and controller actions needed to handle the 4 requests mentioned above.
## Dependencies (Gems/packages)
<details>
  <summary>
    What dependencies do we need to add to support authentication?
  </summary>
  <hr/>

  We need bcrypt so that we can store encrypted (salted and hashed) versions of our users passwords instead of storing passwords in plain text:

  ```bash
  bundle add bcrypt
  ```

  <hr/>

</details>
<br/>


## Configuration (environment variables/other stuff in config folder)
<details>
  <summary>
    What configuration do we need to add to support authentication?
  </summary>
  <hr/>

  We need to tell rails that we want session cookies. To do that, we'll add the following to the config block in `config/application.rb`
  ```rb
  config.middleware.use ActionDispatch::Cookies
  config.middleware.use ActionDispatch::Session::CookieStore

  # Use SameSite=Strict for all cookies to help protect against CSRF
  config.action_dispatch.cookies_same_site_protection = :strict
  ```
  We'll also need to include the middleware within the `ApplicationController`

  ```rb
  class ApplicationController < ActionController::API
    include ActionController::Cookies
    # ...
  end

  ```

  <hr/>

</details>
<br/>



## Database

<details>
  <summary>
    What database changes do we need to make to support authentication?
  </summary>
  <hr/>

  We need a `password_digest` column in our `users` table to store our users' encrypted passwords.

  ```bash
  rails g migration AddPasswordDigestToUsers password_digest
  ```

  ```bash
  rails db:migrate
  ```

  <hr/>

</details>
<br/>



## Models
<details>
  <summary>
    What changes in the model layer do we need to add to support authentication?
  </summary>
  <hr/>

  - We need to add a uniqueness validation for username (and email) So we can consistently find the right user for authentication
  - We need to add the `has_secure_password` macro to the model to implement the `authenticate` and `password=` methods used in login & signup actions respectively

  <hr/>

</details>
<br/>

## Views/Serializers
<details>
  <summary>
    What do we need to change in our serializers to support authentication?
  </summary>
  <hr/>

  - We'll want a `UserSerializer` that returns only the `id`, `username`, and `email`

  <hr/>

</details>
<br/>


## Routes

<details>
  <summary>
    What routes do we need to add to support authentication?
  </summary>
  <hr/>

  ```rb
  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  ```

  <hr/>

</details>
<br/>



## Controllers

<details>
  <summary>
    What changes or additions do we need to affect in our controllers to support authentication?
  </summary>
  <hr/>

  We'll need to:
  - change the `current_user` method so that it makes use of the `user_id` stored in the session cookie sent from the browser. This will allow us to login as different users and have our application recognize user's requests by reading the `user_id` out of the cookie and returning the user whose id matches.

  We'll need actions for:
  - `users#show` - for rendering the currently logged in user as json
  - `users#create` - for handling the signup form submission and rendering the newly created user as json (while logging them in)
  - `sessions#create` - for handling the login form submission and rendering the newly logged in user as json
  - `sessions#destroy` - for handling logout and removing the user_id from the session cookie

  <hr/>

</details>
<br/>



