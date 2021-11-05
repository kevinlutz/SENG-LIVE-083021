class EventsController < ApplicationController
  def create
    event = current_user.created_events.create(event_params)
    if event.valid?
      render json: event, status: :created
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  private

  def event_params
    params.permit(:title, :description, :location, :start_time, :end_time, :group_id)
  end
end
