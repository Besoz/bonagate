class CreatePropertyDetailCategories < ActiveRecord::Migration
  def change
    create_table :property_detail_categories do |t|
      t.string :name_en
      t.string :name_ar

      t.timestamps null: false
    end
  end
end
