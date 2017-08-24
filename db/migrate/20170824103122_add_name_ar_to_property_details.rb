class AddNameArToPropertyDetails < ActiveRecord::Migration
  def change
    add_column :property_details, :name_ar, :string
  end
end
