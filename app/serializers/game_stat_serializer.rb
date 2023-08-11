class GameStatSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :player_id, :played, :batting_average, :at_bat, :hits, :runs, :RBI, :stolen_base, :field_error, :fielding_percentage, :innings_pitched, :ERA, :K 
end
