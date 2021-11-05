class Donation < ActiveRecord::Base
    belongs_to :organization
    belongs_to :donor
    # this macro produces the following methods: 
    # .organization => return a single instance of our organization class that the donation belongs to 
    # .organization=()
    # .build_organization(attributes = {}) => creates an associated organization but it doesnt save 
    # .create_organization(attributes = {}) => creates an associated organization and save it at the same time
    def self.total_donations
        self.sum(:amount)
    end

    def update_status
        self.update(completed: !self.completed)
    end

end 

