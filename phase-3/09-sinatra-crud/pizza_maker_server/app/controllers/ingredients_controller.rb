class IngredientsController < ApplicationController
    
    # respond with all ingredients
    get '/ingredients' do 
        ingredients = Ingredient.all 
        ingredients.to_json # serializing the response into a JSON format
    end
    
    # respond with an ingredient given the ID value
    get '/ingredients/:id' do # /ingredients/3
        ingredient = Ingredient.find(params[:id])
        ingredient.to_json
    end


end
