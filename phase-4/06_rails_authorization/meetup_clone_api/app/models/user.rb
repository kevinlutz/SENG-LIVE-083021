class User < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups

  has_many :user_events, dependent: :destroy
  has_many :events, through: :user_events
  has_many :created_events, class_name: 'Event', dependent: :destroy

  has_many :posts, dependent: :nullify

  # adds the password=, password_confirmation=, and authenticate instance methods to the User model
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, uniqueness: true, allow_blank: true
end