class PagesController < ApplicationController

	include PagesHelper
	
	def index

		if(current_user && (current_user.admin? || current_user.company_user?))
			render 'pages/dashboard-index.html', layout: false
		else

		end
  	end

  	def translation
  		# begin
  			jsonTransFilePath = getJsoni18nFilePath(params[:lang])
  			render file: jsonTransFilePath, layout: false
  		# rescue Exception => e
  			# puts e.message
  			# render :file => "#{Rails.root}/public/404.html", status: :not_found
  		# end
  	end
end
