class Donor < ActiveRecord::Base
    has_many :donations 
    has_many :organization, through: :donations

end


# organization => has many donations
# donation => belongs to both organizaiton and donor, join table: contain 2 foreign key columns of two isolated tables
# donor => has many donations 