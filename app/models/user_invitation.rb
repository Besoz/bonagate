class UserInvitation < ActiveRecord::Base
	extend Enumerize

	validates_uniqueness_of :reciever_email
	validate :validate_receiver_email, on: :create


	enumerize :state, in: [:active, :expired], default: :active , predicates: true, scope: true

	belongs_to :company

	def validate_receiver_email
		errors.add(:user_invitation, 'User already exist') if User.where(email: self.reciever_email).exists?
	end

	def set_expired
		puts self.to_json
		self.update_attributes(state: 'expired')
			puts self.to_json

	end
end
