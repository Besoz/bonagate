class SharedProperty < ActiveRecord::Base
  belongs_to :company
  belongs_to :property
end
