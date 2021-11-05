DONATIONS = [] # we define a global variable, CONSTANT
# # small programs that execute some type of logic 
# def init
#   # execute the program that this method is intended 
#   # puts "inside:"
#   # puts "init"

#   # print "inside:"
#   # print "init"

#   # variables: 
#   name = "Aysan" # local variable
#   puts name 
#   "aysan"
#   # last line of methods will be the return value UNLESS it is a puts statement 
# end 


# puts vs print: puts will print with a line break, print will omit that line break



# greet our user 
# provide some options to our user 
# handle the users selection 
# looping through the application until our user they want to exit the program 

def init # entry method to the CLI 
  greeting 
  menu_list
  menu_selection
end 

def greeting 
  puts "Welcome to the Donations Tracker App"
  puts "Please enter your name:"
  # gets which will wait for an entry from our user 
  name = gets 
  puts "Awesome #{name}, what would you like to do?" # string interpolation to interpolate the value of the name variable 
end 

def menu_list 
  puts "Please select from the following options: "
  puts " Enter '1' to create a new donation!"
  puts " Enter '2' to see a list of the organizations accepting donations"
  puts " To see the menu options again, please enter 'menu'"
  puts " Enter 'exit' if you changed your mind and wish to leave the app"
end 

def menu_selection 
  selection = gets.strip 

  # conditional statements 
  # if/else statement 

  # control flow: lets us execute different logic based on a condition met 

  until selection == 'exit' # until this statement returns true, keep looping through the program based on users selection UNTIL user enters exit 
    if selection == '1'
      create_donation
    elsif selection == '2'
      puts "show the list of orgs"
    elsif selection == 'menu'
      puts 'menu again'
    else 
      puts "Looks like something went wrong, please try again: "
    end
    selection = gets.strip
  end 
end 

def create_donation 
  puts "Looks like you're feeling charitable"
  puts "Please enter the name of the organization that you would like to donate to:"
  organization = gets.strip 
  puts "How much do you want to donate?"
  amount = gets.strip 

  # hash 
  donation = {
    organization: organization, 
    # to access the value of this key 
    # donation[:organization]
    amount: amount 
  }
  DONATIONS << donation # shovel method which is adding a new element to an array 
  binding.pry
  # donation = {
  #   :organization => organization, 
  #   # to access the value of this key 
  #   # donation[:organization]
  #   :amount => amount 
  # }

end 

