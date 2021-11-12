# Rails Authentication Exercise

Apply the changes to your reading list application to support the same 4 endpoints required for authentication.
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

  We'll need actions for:
  - `users#show` - for rendering the currently logged in user as json
  - `users#create` - for handling the signup form submission and rendering the newly created user as json (while logging them in)
  - `sessions#create` - for handling the login form submission and rendering the newly logged in user as json
  - `sessions#destroy` - for handling logout and removing the user_id from the session cookie

  We'll also need to 
  - change the `current_user` method so that it makes use of the `user_id` stored in the session cookie sent from the browser. This will allow us to login as different users and have our application recognize user's requests by reading the `user_id` out of the cookie and returning the associated user.


  <hr/>

</details>
<br/>