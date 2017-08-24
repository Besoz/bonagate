class AddArEnNames < ActiveRecord::Migration
  def change
	rename_column :property_types, :name, :name_en
	add_column :property_types, :name_ar, :string
	rename_column :property_states, :name, :name_en
	add_column :property_states, :name_ar, :string
	rename_column :property_statuses, :name, :name_en
	add_column :property_statuses, :name_ar, :string
	rename_column :property_service_types, :name, :name_en
	add_column :property_service_types, :name_ar, :string
  end
end
