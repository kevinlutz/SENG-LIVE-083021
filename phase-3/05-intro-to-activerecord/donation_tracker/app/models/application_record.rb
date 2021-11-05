# behaves like a template for all model configurations that we want to use throughout the models 

class ApplicationRecord < ActiveRecord::Base # a library responsible for including methods that can be used in our class to retreive or persist data to the databases


    # Create records 
        # .new => need to call .save 
        # .create => combo of .new and .save in one command 
    # Read records
     # .all class method, this will return an array of all the records in the table
     # .find method and this takes in an arg of id number. Reads a single record
     # .find_by - query by a certain attribute, reads a single record, it will return nil if nothing is found 
    # Update records
    # .update a single resource 
    # Destroy records
    # .destroy to delete a record 
end