class Organization < ActiveRecord::Base
    has_many :donations 
    has_many :donors, through: :donations
    # this setup is going to produce a number of methods that we can use to query and return our related data:
    # the following instance methods are: 
    # .donations => returns all of the associated donations for a single organization as an array 
    # .donations << (donation_instance)
    # .donations.build(create_a_new_instance_of_donation)

    # .donors
    # .donors << 
end 