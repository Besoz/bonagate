json.extract! user, :id, :created_at, :updated_at, :role
json.url user_url(user, format: :json)
