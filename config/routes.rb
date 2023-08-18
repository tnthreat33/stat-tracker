Rails.application.routes.draw do
  resources :teams, only: [:index]
  resources :game_stats, only: [:index, :create, :destroy]
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  #get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
