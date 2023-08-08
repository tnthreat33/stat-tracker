class CreateGameStats < ActiveRecord::Migration[6.1]
  def change
    create_table :game_stats do |t|
      t.references :game, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true
      t.integer :played
      t.float :batting_average
      t.integer :at_bat
      t.integer :hits
      t.integer :runs
      t.integer :RBI
      t.integer :stolen_base
      t.integer :errors
      t.float :fielding_percentage
      t.float :innings_pitched
      t.float :ERA
      t.integer :K

      t.timestamps
    end
  end
end
