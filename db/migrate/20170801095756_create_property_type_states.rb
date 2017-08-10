class CreatePropertyTypeStates < ActiveRecord::Migration
  def change
    create_table :property_type_states do |t|
      t.references :property_type, index: true, foreign_key: true
      t.references :property_state, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
