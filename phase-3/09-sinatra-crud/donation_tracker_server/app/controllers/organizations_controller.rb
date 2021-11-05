class OrganizationsController < ApplicationController 


    # retreive all organizations 
    # index route
    get '/organizations' do 
        organizations = Organization.all
        organizations.to_json # serialize that data into json format and return as the response
    end

    # retreive a single organization with a given id 
    # show route 
    get '/organizations/:id' do 
        organization = Organization.find(params[:id])
        organization.to_json
    end


    
end