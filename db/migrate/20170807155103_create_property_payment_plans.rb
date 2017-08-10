class CreatePropertyPaymentPlans < ActiveRecord::Migration
  def change
    create_table :property_payment_plans do |t|
      t.string :name
      t.text :description
      t.string :total_value
      t.references :property, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
