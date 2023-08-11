class Player < ApplicationRecord
  belongs_to :team
  has_many :game_stats
  has_many :games, through: :game_stats

  
end
