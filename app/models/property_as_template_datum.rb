class PropertyAsTemplateDatum < ActiveRecord::Base
	belongs_to :property
	
	translate :name

	validates :name_en, presence: true
	validates :name_ar, presence: true
end