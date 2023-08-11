class GameStatsController < ApplicationController

    def index
        stats = GameStat.all
        render json: stats
    end 
end
