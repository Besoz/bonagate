json.extract! payment, :id, :person_id, :property_id, :created_at, :updated_at
json.url payment_url(payment, format: :json)
json.person_attributes payment.person, partial: 'people/person', as: :person
json.extract! payment, :id, :person_id, :property_id, :created_at, :updated_at
json.payment_records payment.payment_records,
                     partial: 'payment_records/payment_record', as: :payment_record
