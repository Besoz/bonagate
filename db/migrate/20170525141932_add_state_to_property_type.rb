class AddStateToPropertyType < ActiveRecord::Migration
  def change
    add_column :property_types, :state, :string
  end
end
