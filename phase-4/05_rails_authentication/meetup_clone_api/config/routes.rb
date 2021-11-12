Rails.application.routes.draw do

  resources :user_groups, only: [:create, :destroy]
  resources :events
  resources :user_events, only: [:create, :update, :destroy]
  resources :groups, only: [:index, :show, :create]
  # resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
