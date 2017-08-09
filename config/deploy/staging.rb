# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:
# set :repo_url, 'git@bitbucket.org:accorpa/sms_rails_api.git'

server '104.236.2.105', user: 'root', roles: %w{app db web}, password: "H4P!p'?a,Tjbb/s"
# server 'example.com', user: 'deploy', roles: %w{app web}, other_property: :other_value
# server 'db.example.com', user: 'deploy', roles: %w{db}

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/root/bonagate'
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids')
# role-based syntax
# ==================

# Defines a role with one or multiple servers. The primary server in each
# group is considered to be the first unless any  hosts have the primary
# property set. Specify the username and a domain or IP for the server.
# Don't use `:all`, it's a meta role.

# role :app, %w{deploy@example.com}, my_property: :my_value
# role :web, %w{user1@primary.com user2@additional.com}, other_property: :other_value
# role :db,  %w{deploy@example.com}



# Configuration
# =============
# You can set any configuration variable like in config/deploy.rb
# These variables are then only loaded and set in this stage.
# For available Capistrano configuration variables see the documentation page.
# http://capistranorb.com/documentation/getting-started/configuration/
# Feel free to add new variables to customise your setup.
set :repo_url, 'git@bitbucket.org:accorpa/bonagate-rails.git'
set :branch, 'deployment'
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'public/system', 'tmp/cache')

# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult the Net::SSH documentation.
# http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# The server-based syntax can be used to override options:
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }

namespace :deploy do

  # bower install
  task :bower_and_npm_install do
    on roles(:app), in: :sequence, wait: 5 do
      within '/root/bonagate/current/' do
        execute :npm, "install"
        execute :bower, "install"
      end
    end
  end
  after :published, :bower_and_npm_install
end
#task to restart elasticsearch
