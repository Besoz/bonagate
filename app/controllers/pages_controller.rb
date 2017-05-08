class PagesController < ApplicationController

	def index

		if(current_user && (current_user.admin? || current_user.company_user?))
			render 'pages/dashboard-index.html', layout: false
		else

		end
  	end
end
