class CreatePropertyServiceTypeInstances < ActiveRecord::Migration
  def change
    create_table :property_service_type_instances do |t|
      t.string :unit
      t.string :unit_price
      t.references :service_type
      t.references :property

      t.timestamps null: false
    end
  end
end
