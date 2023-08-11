class Player < ApplicationRecord
  belongs_to :team
  has_many :game_stats
  has_many :games, through: :game_stats

  def team_name
    self.team.name
  end 
end
