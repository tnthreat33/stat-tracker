class UpdatePlayerImages < ActiveRecord::Migration[6.1]
  def up
    Player.update_all(image: 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')
  end
  def down
  end
end
