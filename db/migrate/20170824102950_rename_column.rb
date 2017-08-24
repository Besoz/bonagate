class RenameColumn < ActiveRecord::Migration
  def change
	rename_column :property_details, :name, :name_en
  end
end
