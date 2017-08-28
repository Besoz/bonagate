class AddPropertyServiceTypeToProperty < ActiveRecord::Migration
  def change
  	add_belongs_to :properties, :property_service_type, index: true, foreign_key: true, null: false
  end
end
