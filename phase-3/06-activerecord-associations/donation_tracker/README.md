# Active Record Associations

### Lecture Take Aways

- Active Record Associations: One to Many
- Has many, belongs to
- Active Record Associations: Many to Many
- Has many, through
- Join models
- Custom instance and class methods 

### Lecture Deliverables

- Create a new class Donor and donors table
- A donor will have a name attribute
- Set up associations between Donor, Donations, and Organization
- Modify the Donations table to reflect the newly defined associations with a foreign key column.

### Association Macros 
- has_many
- belongs_to
- has many, through 


### Domain modeling 

- Donation (child object)
    - amount: string
    - date: integer
    - completed: boolean
    - organization_id: integer
    - belongs to organization 

- Organization 
    - name: string
    - has many donations 


### how to associate donations with organization
donation = Donation.create(amount: 5000, date: 10/19/21, completed: false, organization_id: 7) - best practice more performant
donation = Donation.create(amount: 5000, date: 10/19/21, completed: false, organization: organization)


if I wanted to see all the donations made to an organization

SELECT * FROM donations WHERE donation.organization_id = organization.id


Has_many through is many to many relationship
relationship between two completely different tables is dependent on a join table