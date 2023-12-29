class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :team_id, :name, :position, :graduation_year, :dominate_hand, :jersey_number, :team_name, :season, :image

  def season
    object.calculate_all_averages
  end

  has_many :game_stats
end
