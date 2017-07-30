class AddMandatoryToPropertyDetails < ActiveRecord::Migration
  def change
    add_column :property_details, :mandatory, :boolean
  end
end
