json.extract! payment_record, :id, :payment_id, :value, :description, :created_at, :updated_at
json.url payment_record_url(payment_record, format: :json)
