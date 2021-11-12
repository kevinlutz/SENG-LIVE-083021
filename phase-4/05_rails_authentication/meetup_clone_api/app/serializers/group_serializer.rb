class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :user_group

  def user_group
    UserGroup.find_by(user_id: current_user.id, group_id: self.object.id)
  end
end
