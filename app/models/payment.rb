class Payment < ActiveRecord::Base
  belongs_to :person
  belongs_to :property
end
