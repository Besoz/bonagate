class CreatePropertyDetailValueOptions < ActiveRecord::Migration
  def change
    create_table :property_detail_value_options do |t|
      t.string :name_en
      t.string :name_ar
      t.references :property_detail, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
