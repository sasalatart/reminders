require 'sinatra'
require 'sinatra/json'
require 'active_record'
require 'sinatra/activerecord'
require 'sinatra/strong-params'
require 'awrence'
require_relative '../config/environments'
require_relative './models/models'
require_relative './errors/errors'
require_relative './helpers/helpers'
require_relative './handlers/handlers'

set :protection, except: [:json_csrf]
set :show_exceptions, :after_handler
set :public_folder, "#{__dir__}/../../client/build"

get '/*' do
  send_file "#{settings.public_folder}/index.html"
end
