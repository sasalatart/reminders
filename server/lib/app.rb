require 'sinatra'
require 'sinatra/json'
require 'active_record'
require 'sinatra/activerecord'
require_relative '../config/environments'
require_relative './models/models'
require_relative './handlers/handlers'

set :public_folder, "#{__dir__}/../../client/build"

get '/*' do
  send_file "#{settings.public_folder}/index.html"
end
