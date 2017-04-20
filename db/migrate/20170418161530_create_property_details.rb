class CreatePropertyDetails < ActiveRecord::Migration
  def change
    create_table :property_details do |t|
      t.string :code
      t.string :name

      t.timestamps null: false
    end
    add_index :property_details, :code, unique: true
  end
end
