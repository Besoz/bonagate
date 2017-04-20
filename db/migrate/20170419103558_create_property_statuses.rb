class CreatePropertyStatuses < ActiveRecord::Migration
  def change
    create_table :property_statuses do |t|
      t.string :code
      t.string :name

      t.timestamps null: false
    end
    add_index :property_statuses, :code, unique: true
  end
end
