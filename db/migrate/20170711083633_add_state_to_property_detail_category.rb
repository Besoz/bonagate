class AddStateToPropertyDetailCategory < ActiveRecord::Migration
  def change
    add_column :property_detail_categories, :state, :string
  end
end
