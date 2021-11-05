# Debugging in Ruby

### Lecture Deliverables

- Consider how to debug migrations files. What tools can be used?
- Determine how to test associations setup
- Use binding.pry to debug seeds file
- Isolate and solve SyntaxError 
- Debug NilClass, wrong number of arguments, and NoMethod errors

#### How to debug each component of the application

##### Migrations:
- What do migrations do, what is the behavior: 
    - version control of our tables/db
    - Sets up the structures of the tables: columns, associations with their types
- What happens when we run `rake db:migrate` 
    - Schema will either be created or updated
- What tools should be used?
    - How to inspect that migrations behaved as expected: 
        - `rake db:migrate:status` 
        - Check schema 
        - Check database by using SQL explorer
- What files could be resourceful? schema
- What is the goal being determined?

#### Associations: 
- What types of popularly used associations are there:
    - belongs_to/has_many
    - has_many/belongs_to
    - has_many, through/has_many
- Best debugging tool?
    - Rake console 
- How to test associations are set up properly?
    - Testing out the associated methods
        - Create an instance
        - Create an associated instance
        - Test an existing instance and its related object, if there is no relation, establishing that relationship
    - Try different method calls
- Association setup 

#### Seeds File:
- Debugging tool used: Rake Console, binding.pry
- If using Active Record 6: `rake db:seed:replant` => use this command if running a file that has already been seeded to avoid duplication.

#### Common errors:

```
In rake console run: admin = Admin.create(name: "Aysan")

=> NameError: uninitialized constant Admin
```

Things to consider:
1. Is the class defined? 
2. If yes, then does the application have access to the file, `config/environment`
3. If both of these are true, look for mispellings, using the correct class

What can be assumed from this error?
Can we use a debugging tool for this? No, its just a matter of observing the code/logic to ensure the pieces are there


```
In rake console run:

donation = Donation.create(amount: 100.00, date: 102021, completed: false)

donation.donor.name
=> NoMethodError: undefined method `name' for nil:NilClass # is trying to call name on something that is returning nil
```

What is this error referring to as a nil:NilClass? 
What tool would be beneficial to debug this error? 

```
In rake console run:

Donation.by_date

=> ArgumentError: wrong number of arguments (given 0, expected 1)
```

Why are we getting this error?

```
In rake console run:

org = Organization.last
org.num_of_donations

=> NoMethodError: undefined method `num_of_donations' for #<...>
```
