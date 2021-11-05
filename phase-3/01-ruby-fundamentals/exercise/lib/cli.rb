PIZZAS = [] # constant variable / global variable 
def init
  puts "Welcome to the lean, mean Pizza Machine App!"
  puts "Tell us your name: "
  user = gets.strip
  puts "Awesome, #{user.capitalize}, What would you like to do?"
  # need to invoke menu list methods
  menu_options
  menu_selection
  goodbye
end 

def menu_options
  puts "Enter the number of your selection, or 'exit' to leave the app."
  puts " 1. Create a new pizza!"
  puts " 2. View the list of created pizzas"
  puts " Change your mind? Type 'exit' to leave the app"
end 

def menu_selection
  selection = gets.strip
  # Need to add some control flow based on users menu selection
  until selection == 'exit'
    if selection == '1'
      create_pizza
    elsif selection == '2'
      created_pizzas
    else 
      puts "Invalid option. Try again: "
    end 
    menu_options
    selection = gets.strip
  end 
end 

def create_pizza
  puts "Name of pizza, get creative!:"
  name = gets.strip
  puts "List your toppings: "
  toppings = gets.strip
  puts "Describe this pizza: "
  desc = gets.strip 

  # need to return a pizza hash
  pizza = {
    name: name,
    toppings: toppings,
    desc: desc
  }

  pizza_confirmation(pizza) # argument: passing pizza hash to be used in pizza_confirmation

  PIZZAS << pizza 

  pizza 

end 

def pizza_confirmation(pizza)
  puts "The pizza you created is:"
  puts "Name: #{pizza[:name]}"
  puts "Toppings: #{pizza[:toppings]}"
  puts "Desc: #{pizza[:desc]}"
end 

# Currently there is not a method to print the list of created pizzas. In order to complete this:
# 1. Think about a way to store and save the pizzas a user creates
# 2. How can this collection be used to print a list of all of the stored pizzas

def created_pizzas
  # if we have an array, want to access the elements in the array what do we do?

  PIZZAS.each do |pizza| # block variable
    # pizza is a hash 
    puts "Name: #{pizza[:name]}"
    puts "Toppings: #{pizza[:toppings]}"
    puts "Desc: #{pizza[:desc]}"
    # where we writ elogic to do something with each element 
  end 

  # PIZZAS.forEach((pizza) => {}) just like JS 
end 

def goodbye
  puts "Come back when you get hungry!!!"
end 