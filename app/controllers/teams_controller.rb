class TeamsController < ApplicationController
    def index 
        teams = Team.all 
        render json: teams
    end 
    def create
        team = Team.new(team_params)
        team.user_id = @current_user.id

    if team.save
      render json: team, status: :created
    else
      render json: { error: team.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def team_params
    params.permit(:name, :nickname, :address, :wins, :loses)
  end
end
