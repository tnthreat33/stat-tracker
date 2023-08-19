class GameSerializer < ActiveModel::Serializer
  attributes :id, :home_team_id, :away_team_id, :date, :city, :state, :away_team_name, :home_team_name
  
  has_many :game_stats
end
