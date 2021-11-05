class GroupsController < ApplicationController
  def index
    render json: Group.all
  end

  def show
    render json: Group.find(params[:id])
  end

  def create
    Group.create(group_params)
    if group.valid?
      render json: group, status: :created
    else
      render json: group.errors, status: :unprocessable_entity
    end
    #  begin
    #   group = Group.create!(group_params)
    #   render json: group, status: :created
    # rescue ActiveRecord::RecordInvalid => e
    #   render json: { errors: e.record.errors }, status: :unprocessable_entity
    # end
  end
  
  private 

  def group_params
    params.permit(:name, :location)
  end
end
