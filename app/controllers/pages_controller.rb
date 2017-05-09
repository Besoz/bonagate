class PagesController < ApplicationController

	def index

		if(current_user && current_user.admin?)

			puts "jjjjjjjjjjjjjjjjjjjjjj"
			render 'pages/dashboard-index.html', layout: false

		else


		end
  	end
end
