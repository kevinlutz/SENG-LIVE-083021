DONATIONS = [] 

def init  
  greeting 
  menu_list
  menu_selection
end 

def greeting 
  puts "Welcome to the Donations Tracker App"
  puts "Please enter your name:"
  name = gets 
  puts "Awesome #{name}, what would you like to do?"
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
  until selection == 'exit' 
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

  donation = {
    organization: organization, 
    amount: amount 
  }
  DONATIONS << donation 

end 