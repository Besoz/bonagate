class CreatePropertyTypeDetails < ActiveRecord::Migration
  def change
    create_table :property_type_details do |t|
      t.references :property_type, index: true, foreign_key: true
      t.references :property_detail, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
