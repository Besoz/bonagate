class CreatePropertyDetailQueries < ActiveRecord::Migration
  def change
    create_table :property_detail_queries do |t|
      t.string :value
      t.references :property_detail
      t.references :user

      t.timestamps null: false
    end
  end
end
