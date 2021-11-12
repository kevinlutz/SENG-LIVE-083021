class UserEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :event_id, uniqueness: { scope: [:user_id], message: "Can't rsvp for the same event twice" }
end
