class GameSerializer < ActiveModel::Serializer
  attributes :id, :home_team_id, :away_team_id, :date, :city, :state
  
end
