class EventsController < ApplicationController
  def create
    event = current_user.created_events.create(event_params)
    if event.valid?
      render json: event, status: :created
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event, status: :ok
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
  end

  private

  def event_params
    params.permit(:title, :description, :location, :start_time, :end_time, :group_id)
  end
end
