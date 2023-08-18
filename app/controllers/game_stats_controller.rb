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
        if @game_stat
        #   if @reservation.user_id == @current_user.id
            @reservation.destroy 
            head :no_content
        #   else 
        #     render json: { error: "Unauthorized: Cannot delete reservation" }, status: :unauthorized
        #   end 
        else 
          render json: { error: "Reservation not found" }, status: :not_found
        end 
      end


    private

def stat_params
    params.permit(:game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K )
end

def find_stat
    @game_stat = GameStat.find_by(id: params[:id])
  end
end

   