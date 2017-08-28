class CreatePaymentRecords < ActiveRecord::Migration
  def change
    create_table :payment_records do |t|
      t.references :payment, index: true, foreign_key: true
      t.integer :value
      t.text :description

      t.timestamps null: false
    end
  end
end
