class TeamSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :address, :wins, :loses, :name, :nickname

  has_many :home_games, class_name: 'Game', foreign_key: 'home_team_id'
  has_many :away_games, class_name: 'Game', foreign_key: 'away_team_id'
  has_many :players
end
