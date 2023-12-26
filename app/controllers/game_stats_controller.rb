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
            render json: { error: "Unauthorized: Cannot delete or update stat" }, status: :unauthorized
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

      def player_stat
        @player = Player.find_by(id: params[:id])
      
        if @player
          @game_stats = @player.game_stats
          render json: @game_stats, status: :accepted
        else 
          render json: { error: "Player not found" }, status: :not_found
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

def stat_params
    params.permit(:game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K )
end

end


   