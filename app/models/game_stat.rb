class GameStat < ApplicationRecord
  validates :played, presence: true
  validates :batting_average, presence: true
  validates :at_bat, presence: true
  validates :hits, presence: true
  validates :runs, presence: true
  validates :RBI, presence: true
  validates :stolen_base, presence: true
  validates :field_error, presence: true
  validates :fielding_percentage, presence: true
  validates :innings_pitched, presence: true
  validates :ERA, presence: true
  validates :K, presence: true

  belongs_to :game
  belongs_to :player

  def self.import_csv(file)
    begin
      ActiveRecord::Base.transaction do
        CSV.foreach(file.path, headers: true) do |row|
          player_name = row['player_name']
          player = Player.find_by("LOWER(name) = ?", player_name.downcase)

          if player
            GameStat.create!(
              game_id: row['game_id'],
              player_id: player.id,
              played: row['played'],
              batting_average: row['batting_average'],
              at_bat: row['at_bat'],
              hits: row['hits'],
              runs: row['runs'],
              RBI: row['RBI'],
              stolen_base: row['stolen_base'],
              field_error: row['field_error'],
              fielding_percentage: row['fielding_percentage'],
              innings_pitched: row['innings_pitched'],
              ERA: row['ERA'],
              K: row['K']
            )
          else
            Rails.logger.error("Player not found with name: #{player_name}")
          end
        end
      end
    rescue CSV::MalformedCSVError => e
      # Handle CSV format errors
      raise "CSV format error: #{e.message}"
    rescue StandardError => e
      # Handle other errors
      Rails.logger.error("Error importing game stats: #{e.message}")
      raise "Error importing game stats: #{e.message}"
    end
  end
end
  

