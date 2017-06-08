class AddNameToPropertyType < ActiveRecord::Migration
  def change
    add_column :property_types, :name, :string
  end
end
