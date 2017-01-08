require_relative './user_handlers'

before /^(?!\/(signup|login))/ do
  @current_user = User.find_by_jwt(request.env['HTTP_TOKEN'])
  halt 403, 'Not authenticated' unless @current_user
end
