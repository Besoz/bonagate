class AddStatusAndStateToProperty < ActiveRecord::Migration
  def change
    add_reference :properties, :property_status, 
                   foreign_key: true, null: false
    add_reference :properties, :property_state,
                  foreign_key: true
  end
end
