class CreatePropertyServiceTypes < ActiveRecord::Migration
  def change
    create_table :property_service_types do |t|
      t.string :code
      t.string :name

      t.timestamps null: false
    end
    add_index :property_service_types, :code, unique: true
  end
end
