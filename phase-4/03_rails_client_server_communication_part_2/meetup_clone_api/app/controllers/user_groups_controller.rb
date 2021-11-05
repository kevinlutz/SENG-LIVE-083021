class UserGroupsController < ApplicationController
  def create
    user_group = current_user.user_groups.create(user_group_params)
    if user_group.valid?
      render json: user_group, status: :created
    else
      render json: { errors: user_group.errors}, status: :unprocessable_entity
    end
  end

  private

  def user_group_params
    params.permit(:group_id)
  end
end
