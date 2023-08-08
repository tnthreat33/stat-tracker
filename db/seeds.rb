# require 'faker'

# require 'csv'

# # csv_file_path = Rails.root.join('db', 'players.csv')

# # # Read and seed data from the CSV file
# # CSV.foreach(csv_file_path, headers: true) do |row|
# #   Player.create!(
# #     team_id: row['team_id'],
# #     name: row['name'],
# #     position: row['position'],
# #     graduation_year: row['graduation_year'],
# #     dominate_hand: row['dominate_hand'],
# #     jersey_number: row['jersey_number']
# #   )
# # end
# csv_file_path = Rails.root.join('db', 'game_stats.csv')

# # Read and seed data from the CSV file
# CSV.foreach(csv_file_path, headers: true) do |row|
#     GameStat.create!(
#       game_id: row['game_id'],
#       player_id: row['player_id'],
#       played: row['played'],
#       batting_average: row['batting_average'],
#       at_bat: row['at_bat'],
#       hits: row['hits'],
#       runs: row['runs'],
#       RBI: row['RBI'],
#       stolen_base: row['stolen_base'],
#       field_error: row['field_error'],  
#       fielding_percentage: row['fielding_percentage'],
#       innings_pitched: row['innings_pitched'],
#       ERA: row['ERA'],
#       K: row['K']
#     )
#   end
  

# # Create a specific user
# User.create!(
#   address: '4732 Kingsley Dr.',
#   email: 'tnthreat33@gmail.com',
#   password_digest: '123',
#   username: 'rhamby95',
#   first_name: 'Rachel',
#   last_name: 'Hamby'
# )

# # Create additional random users
# 4.times do
#   User.create!(
#     address: Faker::Address.full_address,
#     email: Faker::Internet.email,
#     password_digest: 'password',
#     username: Faker::Internet.username,
#     first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name
#   )
# end

# Team.create!(
#   user_id: 1,
#   address: 'Greenwood, IN',
#   wins: 3,
#   loses: 0,
#   name: 'Center Grove High School',
#   nickname: 'Trojans'
# )
# Team.create!(
#   user_id: 2,
#   address: 'Whiteland, IN',
#   wins: 2,
#   loses: 1,
#   name: 'Whiteland High School',
#   nickname: 'Warriors'
# )
# Team.create!(
#   user_id: 3,
#   address: 'Zionsville, IN',
#   wins: 3,
#   loses: 1,
#   name: 'Zionsville High School',
#   nickname: 'Eagles'
# )
# Team.create!(
#   user_id: 4,
#   address: 'Pendleton, IN',
#   wins: 3,
#   loses: 1,
#   name: 'Pendleton Heights High School',
#   nickname: 'Arabians'
# )
# Game.create!(
#       home_team_id: 1,
#       away_team_id: 2,
#       date: Date.new(2023, 3, 28),
#       city: "Greenwood",
#       state: "IN",
#     )
#  Game.create!(
#       home_team_id: 3,
#       away_team_id: 1,
#       date: Date.new(2023, 3, 29),
#       city: "Pendleton",
#       state: "IN",
#     )
# Game.create!(
#         home_team_id: 4,
#         away_team_id: 1,
#         date: Date.new(2023, 3, 31),
#         city: "Pendleton",
#         state: "IN",
#       )




