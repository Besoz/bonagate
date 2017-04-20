class AddRoleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :role, :string, default: User.NORMAL_USER 
  end
end
