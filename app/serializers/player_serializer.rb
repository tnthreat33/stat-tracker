class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :team_id, :name, :position, :graduation_year, :dominate_hand, :jersey_number, :team_name

  has_many :game_stats
end
