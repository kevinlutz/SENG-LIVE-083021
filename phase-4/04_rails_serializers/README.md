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