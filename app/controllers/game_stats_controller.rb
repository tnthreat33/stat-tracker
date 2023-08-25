class GameStatsController < ApplicationController
    
    def index
        stats = GameStat.all
        render json: stats
    end 

    def create 
        stat = GameStat.create(stat_params)
        if stat.valid?
        render json: stat, status: :created
        else
            render json: {error: stat.errors.full_messages}, status: :unprocessable_entity
        end
    end 
    
    def destroy 
        if stat = GameStat.find_by(id: params[:id])
         if stat.game.away_team_id || stat.game.home_team_id == @current_user.team.id
            stat.destroy 
            head :no_content
          else 
            render json: { error: "Unauthorized: Cannot delete reservation" }, status: :unauthorized
          end 
        else 
          render json: { error: "Stat not found" }, status: :not_found
        end 
      end
      def update
        if stat = GameStat.find_by(id: params[:id])
             if stat.game.away_team_id || stat.game.home_team_id == @current_user.team.id
                if stat.update(stat_params)
                    render json: stat, status: :accepted
                else
                    render json: { error: stat.errors.full_messages }, status: :unprocessable_entity
                end
          else
            render json: { error: "Unauthorized: Cannot update reservation" }, status: :unauthorized
          end
        else
          render json: { error: "Reservation not found" }, status: :not_found
        end
      end

    private

def stat_params
    params.permit(:game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K )
end

end


   