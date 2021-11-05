require 'pry'

class Donation 

    attr_accessor :organization, :amount, :date 

    def initialize(org, amt, date)
        @organization = org
        @amount = amt
        @date = date 
    end 

end 

