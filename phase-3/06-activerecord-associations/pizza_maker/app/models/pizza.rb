class Pizza < ActiveRecord::Base
    has_many :pizza_ingredients
    has_many :ingredients, through: :pizza_ingredients

end 

