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
        stat = GameStat.find_by(id: params[:id])
        # if @game_stat
        #   if @reservation.user_id == @current_user.id
            stat.destroy 
            head :no_content
        #   else 
        #     render json: { error: "Unauthorized: Cannot delete reservation" }, status: :unauthorized
        #   end 
        # else 
        #   render json: { error: "Stat not found" }, status: :not_found
        # end 
      end
      def update
        stat = GameStat.find_by(id: params[:id])
        stat.update(stat_params)
        render json: stat, status: :accepted
        # if @reservation
        #   if @reservation.user_id == @current_user.id
        #     if @reservation.update(reservation_params)
        #       render json: @reservation, status: :accepted
        #     else
        #       render json: { error: @reservation.errors.full_messages }, status: :unprocessable_entity
        #     end
        #   else
        #     render json: { error: "Unauthorized: Cannot update reservation" }, status: :unauthorized
        #   end
        # else
        #   render json: { error: "Reservation not found" }, status: :not_found
        # end
      end

    private

def stat_params
    params.permit(:game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K )
end

# def find_stat
#     @game_stat = GameStat.find_by(id: params[:id])
#   end
end

   