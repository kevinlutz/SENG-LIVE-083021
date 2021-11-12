class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :start_time, :end_time, :location, :group_id, :user_event

  def user_event
    UserEvent.find_by(user_id: current_user.id, event_id: self.object.id)
  end
end
