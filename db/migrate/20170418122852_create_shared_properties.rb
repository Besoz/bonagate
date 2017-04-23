class CreateSharedProperties < ActiveRecord::Migration
  def change
    create_table :shared_properties do |t|
      t.references :company, index: true, foreign_key: true
      t.references :property, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
