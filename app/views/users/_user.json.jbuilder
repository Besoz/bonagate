json.extract! user, :id, :created_at, :updated_at, 
                    :role, :email, :approved, :confirmed, :active, 
                    :first_name, :last_name, :phone, :last_login_at, :avatar
json.url user_url(user, format: :json)
