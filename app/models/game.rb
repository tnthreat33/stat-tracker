class Game < ApplicationRecord
  belongs_to :home_team, class_name: 'Team'
  belongs_to :away_team, class_name: 'Team'
  has_many :game_stats
  has_many :players, through: :game_stats

  def away_team_name
    self.away_team.name
  end 

  def home_team_name
    self.home_team.name
  end 
end
