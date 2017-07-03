class AddPropertyToPropertyImages < ActiveRecord::Migration
  def change
    add_reference :property_images, :property, index: true, foreign_key: true
  end
end
