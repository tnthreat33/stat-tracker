Rails.application.routes.draw do
  resources :teams, only: [:index, :create]
  resources :game_stats do
    collection do
      post 'import_csv'
    end
  end
  resources :users, only: [:show, :create]
  resources :players, only: [:create]
  resources :games, only: [:create, :index]

  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get "/teams/:id", to: "teams#show"
  get "/game_stats/player/:id", to: "game_stats#player_stat"
  post "/chat", to: "chat#create"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  #get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
