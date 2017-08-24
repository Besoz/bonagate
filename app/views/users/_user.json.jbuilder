json.extract! user, :id, :created_at, :updated_at, 
                    :role, :email, :approved, :confirmed, :active, 
                    :first_name, :last_name, :phone, :last_login_at, 
                    :avatar, :locale
json.url user_url(user, format: :json)

if user.company_user?
	json.company do
		json.role user.company_user.role
		json.id user.company_user.company_id
		json.partial! "companies/company", company: user.company_user.company
	end
end
