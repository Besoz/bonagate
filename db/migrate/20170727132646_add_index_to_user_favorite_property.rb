class AddIndexToUserFavoriteProperty < ActiveRecord::Migration
	def change
		add_column :user_favorite_properties, :user_id , :integer
		add_column :user_favorite_properties, :property_id , :integer
		add_index :user_favorite_properties, :user_id
		add_index :user_favorite_properties , :property_id
		add_index :user_favorite_properties , [:user_id,:property_id] ,unique: true
	end

end
