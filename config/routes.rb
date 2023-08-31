Rails.application.routes.draw do
  resources :teams, only: [:index, :create]
  resources :game_stats 
  resources :users, only: [:show, :create]
  resources :players, only: [:create]
  resources :games, only: [:create]

  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get "/teams/:id", to: "teams#show"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  #get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
