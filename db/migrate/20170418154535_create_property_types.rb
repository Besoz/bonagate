class CreatePropertyTypes < ActiveRecord::Migration
  def change
    create_table :property_types do |t|
      t.string :code

      t.timestamps null: false
    end
    add_index :property_types, :code, unique: true
  end
end
