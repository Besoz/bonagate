class CreatePropertyImages < ActiveRecord::Migration
  def change
    create_table :property_images do |t|
      t.timestamps null: false
      t.attachment :avatar
    end
  end
end
