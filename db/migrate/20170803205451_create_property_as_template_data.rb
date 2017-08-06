class CreatePropertyAsTemplateData < ActiveRecord::Migration
  def change
	create_table :property_as_template_data do |t|
		t.string :name_en
		t.string :name_ar
		t.belongs_to :property, index: { unique: true }, foreign_key: true
		t.timestamps null: false
	end
  end
end
