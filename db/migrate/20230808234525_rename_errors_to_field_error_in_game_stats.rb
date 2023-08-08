class RenameErrorsToFieldErrorInGameStats < ActiveRecord::Migration[6.1]
  def change
    rename_column :game_stats, :errors, :field_error
  end
end
