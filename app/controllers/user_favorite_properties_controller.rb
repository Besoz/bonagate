class UserFavoritePropertiesController < ApplicationController
	before_action :set_user
	def create
		puts "creating"
		@property =  Property.find_by_id(params[:property_id]);
		@user.properties << @property;
		render json: { status: :ok}

	end

	def destroy
		puts "deleting"
		@property =  Property.find_by_id(params[:id]);
		@user.properties.delete(@property)
		render json: { status: :ok}
	end

	private
	def set_user
		if !current_user
			redirect_to '/sign_in'
		else
			@user = current_user
		end

	end

end
