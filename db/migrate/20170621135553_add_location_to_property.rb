class AddLocationToProperty < ActiveRecord::Migration
  def change
    add_column :properties, :lat, :double
    add_column :properties, :lng, :double
    add_column :properties, :country, :string
    add_column :properties, :city, :string
    add_column :properties, :area, :string
    add_column :properties, :street, :string
    add_column :properties, :number, :int
    add_column :properties, :floor, :int
  end
end
