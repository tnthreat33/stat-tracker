class RemoveHeightWeightFromPlayersAndAddJerseyNumber < ActiveRecord::Migration[6.0]
  def change
    remove_column :players, :height, :integer
    remove_column :players, :weight, :integer
    add_column :players, :jersey_number, :integer
  end
end

