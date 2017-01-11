class NotFoundError < StandardError
end

error NotFoundError do
  status 404
  json message: "#{env['sinatra.error'].message} not found."
end
