require 'rack'
require 'rack/contrib'
require_relative './lib/app'

use Rack::PostBodyContentTypeParser

run Sinatra::Application
