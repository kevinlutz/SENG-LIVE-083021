Today we are going to start working with the web. So far what we have built out is an application that has a database and allows us to store and retreive data, using Active Record. Models to active record so we can call on methods that will persist or query on data in the respective tables. And we migrate migration files that manage the database structure. Now we want to serve this data up on an interface that users can interact with. So we have to make a decision about what we want that interface to look like and what technology we want to use. We could use Sinatra and build out views, but while Sinatra is pretty powerful, its also very lightweight and simple. We want our web page to be modern and dynamic. So if we want to use use a technology like React, then we need to also have a way to access data in result of requests. 

Ask students what they think this interface is called? And how does it work?

So we are going to build an API with different end points, and an incoming request, process it, and serve up a set of data in JSON format. 

Before we start defining our end points, lets first define the routes we want to create and what type of data will be accessible at these endpoints

Currently we have a config.ru file and this is a rack configuration file. Inside this file it is important to make sure to run a class. 

Config.ru file currently has no run method, so run rake server to show error and discuss with students how to handle. 

First we need to define a controller inside controllers folder. Go over how the controller will is the part of the MVC that will receive requests and process them. There will be communication with models and databases, that will then be jsonified. 

Lets first 

```rb
class ApplicationController < Sinatra::Base

end

```

We will create a OrganizationsController so that we can separate responsinbilities and keep our code clean and organized. This controller will be responsible for all organization requests. 

```rb
class OrganizationnController < ApplicationController

end

```

The first endpoint we want to create will be `'/organizations'` which will return all donation records. 

```rb
class OrganizationController < ApplicationController

    get "/organizations" do 
        organizations = Organization.all 
        organizations.to_json 
    end

end

```

inside the config.ru, we need to tell rack to run application controller but use donation controller

let's run the server and navigate to `localhost:9292`

Point our error message and discuss how Sinatra is really helpful with error messages and will give this error for many reasons. 

Add new route to application controller and test in browser

```rb
    get '/' do 
        "hello world"
    end
```

Next navigate to `localhost:9292/organizations`

This error looks the same as the previous error but let's take a look at the organizations controller and point that this route is defined and that the problem is our config.ru needs to know about the organizations controller. 

```rb
add to config.ru
use OrganizationController 
```

Okay, let's handle the response now:

What does the code to select all organizations from the table look like?

```rb
organizations = Organization.all
organizations.to_json
```

We can test this out in a couple ways: 
1. Navigate to localhost:9292/organizations 
2. Use Postman
3. console.log response on front end 

Now lets create an end point that will serve up just 1 organization based on the ID. 
We want to make this route pretty dynamic so that we can reuse this endpoint regardless of the ID value so we'll be using dynamic routes

```rb
get '/organizations/:id' do 
    binding.pry
end 
```

Let's take a look at how we can access and use the id value when this request is made
Once pry is hit, go over params hash

```rb
    get "/organizations/:id" do 
        organization = Organization.find(params[:id])
        organization.to_json
    end
```