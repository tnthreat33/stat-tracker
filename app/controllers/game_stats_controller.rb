class GameStatsController < ApplicationController

    def index
        stats = GameStat.all
        render json: stats
    end 

    def create 
        byebug
        stat = GameStat.create(stat_params)
        if stat.valid?
        render json: stat, status: :created
        else
            render json: {error: stat.errors.full_messages}, status: :unprocessable_entity
        end
    end 

    private

def stat_params
    params.permit(:game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K )
end
end

   