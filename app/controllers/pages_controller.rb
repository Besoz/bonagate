class PagesController < ApplicationController
  include PagesHelper

  def index

    if(current_user && (current_user.admin? || current_user.company_user?))
      render 'pages/dashboard-index.html', layout: false
    end
  end

  def translation
    jsonTransFilePath = getJsoni18nFilePath(params[:lang])
    render file: jsonTransFilePath, layout: false
  end

  def change_locale
    I18n.locale = params[:locale] || I18n.default_locale
    current_user.update_attributes(locale: params[:locale])
    render json: "",status: :ok
  end
end
