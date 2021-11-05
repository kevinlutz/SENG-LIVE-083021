class User < ApplicationRecord
  has_many :user_groups, dependent: :destroy
  has_many :groups, through: :user_groups

  has_many :user_events, dependent: :destroy
  has_many :events, through: :user_events
  has_many :created_events, class_name: 'Event', dependent: :destroy

  has_many :posts, dependent: :nullify
end