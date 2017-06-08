class AddStateToTable < ActiveRecord::Migration
  def change
    add_column :property_details, :state, :string
    add_column :property_states, :state, :string
    add_column :property_statuses, :state, :string
    add_column :property_service_types, :state, :string
    add_column :properties, :state, :string
    add_column :companies, :state, :string
  end
end
