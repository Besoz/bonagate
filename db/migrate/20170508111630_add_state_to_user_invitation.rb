class AddStateToUserInvitation < ActiveRecord::Migration
  def change
    add_column :user_invitations, :state, :string
  end
end
