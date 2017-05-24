class AddValueTypeToPropertyDetails < ActiveRecord::Migration
  def change
    add_column :property_details, :value_type, :string
  end
end
