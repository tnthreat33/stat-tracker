class PlayersController < ApplicationController

    def create
        byebug
        player = Player.new(player_params)

    if player.save
      render json: player, status: :created
    else
      render json: { error: player.errors.full_messages }, status: :unprocessable_entity
    end
  end
  private
  def player_params
    params.permit(:name, :graduation_year, :dominate_hand, :jersey_number, :position)
  end
end
