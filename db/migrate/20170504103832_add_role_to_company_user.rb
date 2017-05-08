class AddRoleToCompanyUser < ActiveRecord::Migration
  def change
	add_column :company_users, :role, :string
  end
end
