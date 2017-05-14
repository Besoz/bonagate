json.extract! company, :id, :name, :email, :phone, :avatar, :facebook,
                       :gplus, :twitter
json.url company_url(company, format: :json)
