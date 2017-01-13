class NotAuthenticatedError < StandardError
end

error NotAuthenticatedError do
  status 403
  json message: 'Not authenticated.'
end
