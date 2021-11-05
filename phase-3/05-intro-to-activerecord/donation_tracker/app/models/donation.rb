class Donation < ActiveRecord::Base
    
    # what type of method is this going to be? class or instance method

    def self.sum_amount
        self.sum(:amount)
    end

    def change_status 
        # toggle the completed status of a given donation 
        # how can we toggle a certain instances completed status 
        # .update 
        # conditional statement if true, change to false etc.
        # self.completed = !completed
        self.update(completed: !self.completed)
    end


    # attr_accessor :amount, :date, :organization_id 
    # attr_reader :id

    # def initialize(attributes) 
    #     attributes.each do |key, value|
    #         if self.respond_to?("#{key.to_s}=") 
    #             self.send("#{key.to_s}=", value) 
    #         end 
    #     end

    # end

    # def save 
    #     if self.id
    #         self.update
    #     else 
    #         sql = <<-SQL
    #             INSERT INTO donations (amount, date, organization_id) VALUES (?, ?, ?);
    #         SQL

    #         DB.execute(sql, self.amount, self.date, self.organization_id)
    #         @id = DB.last_insert_row_id
    #     end 
    #     self  
    # end

    # def update 
    #     sql = <<-SQL
    #        UPDATE donations SET amount = ?, date = ?, organization_id = ? WHERE id = ?
    #     SQL

    #     DB.execute(sql, self.amount, self.date, self.organization_id, self.id)
    #     self
    # end

    # def self.all 
    #     array_of_hashes = DB.execute("SELECT * FROM donations")
    #     array_of_hashes.map do |hash|
    #         binding.pry
    #       self.new(hash)
    #     end
    # end

    # def self.create_table 
    #     sql = <<-SQL
    #     CREATE TABLE IF NOT EXISTS donations (
    #         id INTEGER PRIMARY KEY, 
    #         amount INTEGER,
    #         date INTEGER,
    #         organization_id INTEGER
    #     );
    #     SQL
    #     DB.execute(sql)
    # end 

    # def name 
    #     puts "testing send!!!"
    # end 

end 

