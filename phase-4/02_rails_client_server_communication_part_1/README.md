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

The curriculum also shows how to use begin/rescue syntax to handle validation logic in the controller

![mvc flow with validation and begin/rescue](../assets/mvc-flow-with-validations-create-and-rescue.png)

When you get to this portion, know that we're showing this mainly so you're familiar with the syntax for handling exceptions in Ruby. If you'd prefer to use either of the above 2 options instead, that's perfectly fine for use in the controller.

Custom exception handling becomes a better choice when you're doing something more complicated where multiple exceptions are possible and need to be handled differently. In a controller action, validation error is virtually the only thing that could go wrong, so handling it with simple conditional logic is more common.

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
    event = Event.new(event_params)
    if event.save
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
