class CreateUserFavoriteProperties < ActiveRecord::Migration
  def change
    create_table :user_favorite_properties do |t|
      t.timestamps null: false
    end

  end
  end
end
