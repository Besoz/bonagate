class CreatePropertyDetailInstanceValueOptions < ActiveRecord::Migration
  def change
    create_table :property_detail_instance_value_options do |t|
      t.references :property_detail_instance, index: true, foreign_key: true,  index: { name: 'index_detail_instance_value_options_on_detail_instance_id' }
      t.references :property_detail_value_option, index: true, foreign_key: true,  index: { name: 'index_detail_instance_value_options_on_detail_value_option_id' }

      t.timestamps null: false
    end
  end
end
