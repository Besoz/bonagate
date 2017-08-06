class PaymentRecord < ActiveRecord::Base
  belongs_to :payment

  has_attached_file :attachment
  validates_attachment_content_type :attachment,
                                    content_type: ['application/pdf', 'image/jpeg',
                                                   'image/gif', 'image/png'],
                                    message: 'file type is not allowed (only jpeg/png/gif images and pdf)'
end
