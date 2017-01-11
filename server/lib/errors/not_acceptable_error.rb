class NotAcceptableError < StandardError
end

error NotAcceptableError do
  status 406
  json message: env['sinatra.error'].message
end
