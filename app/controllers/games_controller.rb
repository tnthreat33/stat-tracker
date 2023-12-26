class GamesController < ApplicationController

  def index 
    games = Game.all 
    render json: games
end 

    def create
        game = Game.new(game_params)

    if game.save
      render json: game, status: :created
    else
      render json: { error: game.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def import_csv
    begin
      GameStat.import_csv(params[:file])
      render json: { message: 'Game stats imported successfully.' }, status: :ok
    rescue StandardError => e
      render json: { error: "Error importing game stats: #{e.message}" }, status: :unprocessable_entity
    end
  end
  
  private
  def game_params
    params.permit(:away_team_id, :home_team_id, :date, :city, :state)
  end
end
