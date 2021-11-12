class EventDetailSerializer < EventSerializer
  belongs_to :group
  has_many :attendees
  attributes :creator

  def creator
    self.object.user.username
  end
end
