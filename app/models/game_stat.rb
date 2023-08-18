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
end
