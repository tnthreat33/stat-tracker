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

  def calculate_batting_average
    
    total_batting_average = self.game_stats.sum(:batting_average)
    total_games_played = self.game_stats.sum(:played)
    total_batting_average / total_games_played
  end

  def calculate_era
    
    total_era = self.game_stats.sum(:ERA)
    total_games_played = self.game_stats.sum(:played)
    total_era / total_games_played
  end

  def calculate_hits
    
    total_hits = self.game_stats.sum(:hits)
    
  end
  def calculate_k
    
    total_k = self.game_stats.sum(:K)
    
  end

  def calculate_rbi
   
    total_rbi = self.game_stats.sum(:RBI)
    
  end

  def calculate_at_bats
    
    total_at_bat= self.game_stats.sum(:at_bat)
    
  end

  def calculate_errors
  
    total_era = self.game_stats.sum(:field_error)
    
  end

  def calculate_innings_pitched
   
    total_hits = self.game_stats.sum(:innings_pitched)
    
  end
  def calculate_stolen_bases
    
    total_k = self.game_stats.sum(:stolen_base)
    
  end

  def calculate_runs
    
    total_rbi = self.game_stats.sum(:RBI)
    
  end

 

  

  def calculate_all_averages
    {
      batting_average: calculate_batting_average,
      season_era: calculate_era,
      season_hits_average: calculate_hits,
      season_k: calculate_k,
      season_rbi: calculate_rbi,
      season_ab: calculate_at_bats,
      season_fielding_error: calculate_errors,
      season_ip: calculate_innings_pitched,
      season_stolen_bases: calculate_stolen_bases,
      season_runs: calculate_runs
      
    }
  end
           
end
