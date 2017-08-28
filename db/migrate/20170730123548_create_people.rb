class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.references :company_user, index: true, foreign_key: true
      t.string :ssn
      t.string :first_name
      t.string :last_name

      t.timestamps null: false
    end
  end
end
