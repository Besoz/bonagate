class CreatePropertyStates < ActiveRecord::Migration
  def change
    create_table :property_states do |t|
      t.string :code
      t.string :name

      t.timestamps null: false
    end
    add_index :property_states, :code, unique: true
  end
end
