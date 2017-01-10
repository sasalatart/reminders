require 'rack'
require 'rack/contrib'
require 'rack/parser'
require 'plissken'
require_relative './lib/app'

use Rack::PostBodyContentTypeParser

use Rack::Parser, parsers: {
  'application/json' => proc { |data| JSON.parse(data).to_snake_keys }
}

run Sinatra::Application
