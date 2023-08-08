class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.references :user, null: false, foreign_key: true
      t.string :address
      t.integer :wins
      t.integer :loses
      t.string :name
      t.string :nickname

      t.timestamps
    end
  end
end
