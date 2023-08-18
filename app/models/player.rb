class Player < ApplicationRecord
  validates :name, presence: true
  validates :position, presence: true
  validates :graduation_year, presence: true
  validates :dominate_hand, presence: true
  validates :jersey_number, presence: true
 
  belongs_to :team
  has_many :game_stats
  has_many :games, through: :game_stats

  def team_name
    self.team.name
  end 
end
