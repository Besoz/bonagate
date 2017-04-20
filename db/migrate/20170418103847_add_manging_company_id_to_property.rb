class AddMangingCompanyIdToProperty < ActiveRecord::Migration
  def change
    add_reference :properties, :company, index: true, foreign_key: true, :null => false
  end
end
