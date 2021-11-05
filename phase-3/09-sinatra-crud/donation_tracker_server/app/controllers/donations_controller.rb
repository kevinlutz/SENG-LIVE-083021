class DonationsController < ApplicationController
    set :default_content_type, 'application/json'

    get "/donations" do
        donations = Donation.all
        donations.to_json
    end
    
end