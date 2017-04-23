json.extract! user_invitation, :id, :random_key, :reciever_email, :reciever_name, :company_id, :user_id, :created_at, :updated_at
json.url user_invitation_url(user_invitation, format: :json)
