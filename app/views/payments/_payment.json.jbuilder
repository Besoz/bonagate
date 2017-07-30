json.extract! payment, :id, :person_id, :property_id, :created_at, :updated_at
json.url payment_url(payment, format: :json)
