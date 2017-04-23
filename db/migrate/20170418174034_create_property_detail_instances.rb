class CreatePropertyDetailInstances < ActiveRecord::Migration
  def change
    create_table :property_detail_instances do |t|
      t.references :property, index: true, foreign_key: true
      t.references :property_detail, index: true, foreign_key: true
      t.string :value

      t.timestamps null: false
    end
  end
end
