json.extract! user, :id, :created_at, :updated_at, :role, :email, :approved, :confirmed, :active
json.url user_url(user, format: :json)
