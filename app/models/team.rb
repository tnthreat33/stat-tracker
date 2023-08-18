class Team < ApplicationRecord

  validates :name, presence: true
  validates :wins, presence: true
  validates :loses, presence: true
  validates :nickname, presence: true
  
  belongs_to :user
  has_many :home_games, class_name: 'Game', foreign_key: 'home_team_id'
  has_many :away_games, class_name: 'Game', foreign_key: 'away_team_id'
  has_many :players
  
  
end
