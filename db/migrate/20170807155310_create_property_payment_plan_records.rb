class CreatePropertyPaymentPlanRecords < ActiveRecord::Migration
  def change
    create_table :property_payment_plan_records do |t|
      t.text :description
      t.string :value
      t.string :period
      t.boolean :periodic
      t.references :property_payment_plan, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
