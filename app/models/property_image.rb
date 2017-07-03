class PropertyImage < ActiveRecord::Base
    belongs_to :property
    
    has_attached_file :avatar
    validates_attachment_presence :avatar
validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
end
