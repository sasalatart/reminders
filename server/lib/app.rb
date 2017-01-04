require 'sinatra'

set :public_folder, "#{__dir__}/../../client/build"

get '/*' do
  send_file "#{settings.public_folder}/index.html"
end
