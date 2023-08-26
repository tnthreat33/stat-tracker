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
        @game_stat = GameStat.find_by(id: params[:id])
        
        if @game_stat
          team = @game_stat.player.team
          if team && team.user == @current_user
            @game_stat.destroy
            head :no_content
          else
            render json: { error: "Unauthorized: Cannot delete stat" }, status: :unauthorized
          end
        else 
          render json: { error: "Stat not found" }, status: :not_found
        end 
      end
      
      def update
        @game_stat = GameStat.find_by(id: params[:id])
        
        if @game_stat
          team = @game_stat.player.team
          if team && team.user == @current_user
                if @game_stat.update(stat_params)
                    render json: @game_stat, status: :accepted
                else
                    render json: { error: stat.errors.full_messages }, status: :unprocessable_entity
                end
          else
            render json: { error: "Unauthorized: Cannot update reservation" }, status: :unauthorized
          end
        else
          render json: { error: "Stat not found" }, status: :not_found
        end
      end

    private

def stat_params
    params.permit(:game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K )
end

end


   