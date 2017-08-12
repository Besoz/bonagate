class AddPublishColumnToProperty < ActiveRecord::Migration
	def change
		add_column :properties, :publish, :boolean	
	end
end
