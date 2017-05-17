module PagesHelper

	require 'json'
	require 'yaml'


	def getJsoni18nFilePath(lang)

		input_filename = 'config/locales/' + lang + '.yml'
		output_filename = input_filename.sub(/(yml|yaml)$/, 'json')

		input_file = File.open(input_filename, 'r')
		input_yml = input_file.read
		input_file.close

		output_json_str = JSON.dump(YAML::load(input_yml))

		output_json = JSON.parse(output_json_str)
		output_json.each do |k, v| 
			output_json_str = v
		end

		
		# puts output_json
		output_file = File.open(output_filename, 'w+')
		output_file.write(output_json_str.to_json)
		output_file.close

		return output_filename
	end
end
