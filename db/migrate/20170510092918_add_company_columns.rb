class AddCompanyColumns < ActiveRecord::Migration
  def change
    add_attachment :companies, :avatar
    add_column :companies, :email, :string
    add_column :companies, :phone, :string
    add_column :companies, :facebook, :string
    add_column :companies, :gplus, :string
    add_column :companies, :twitter, :string
    add_column :companies, :overview, :text
  end
end
