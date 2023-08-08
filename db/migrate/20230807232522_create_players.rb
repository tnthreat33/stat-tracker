class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.references :team, null: false, foreign_key: true
      t.string :name
      t.string :position
      t.integer :graduation_year
      t.string :dominate_hand
      t.integer :height
      t.integer :weight

      t.timestamps
    end
  end
end
