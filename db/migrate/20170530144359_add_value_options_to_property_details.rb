class AddValueOptionsToPropertyDetails < ActiveRecord::Migration
  def change
    add_column :property_details, :value_options, :string
  end
end
