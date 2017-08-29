class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.references :person, index: true, foreign_key: true
      t.references :property, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
