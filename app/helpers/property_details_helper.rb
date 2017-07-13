module PropertyDetailsHelper
  
  def value_options_changed?(old_value_options, new_value_options)

      puts old_value_options.map{|x| x[:id]}.to_json
      puts new_value_options.select { |num|  num != nil }.map{|x| x[:id]}

      old_value_options.map{|x| x[:id]} != new_value_options.map{|x| x[:id]}.select { |num|  num !=nil }
  end
end
