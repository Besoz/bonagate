# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
puts '##############################################################'
puts '################# start seeding ##############################'
puts '##############################################################'
if User.where(email: 'admin@bonagate.com').exists?
  puts 'admin already exist'
else
  puts 'creating admin'
  User.create(email: 'admin@bonagate.com', password: '123456789',
              password_confirmation: '123456789', role: :admin)
end
puts '##############################################################'
puts '################# end seeding ################################'
puts '##############################################################'
