class AddCategoryToPropertyDetails < ActiveRecord::Migration
  def change
    add_reference :property_details, :property_detail_category, index: true, foreign_key: true
  end
end
