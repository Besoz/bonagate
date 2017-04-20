class CreateUserInvitations < ActiveRecord::Migration
  def change
    create_table :user_invitations do |t|
      t.string :random_key
      t.string :reciever_email
      t.string :reciever_name
      t.references :company, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :user_invitations, :random_key, unique: true
  end
end
