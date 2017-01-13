require_relative './user_handlers'
require_relative './reminder_handlers'

before %r{^(?!\/(signup|login))} do
  @current_user = User.find_by_jwt(request.env['HTTP_TOKEN'])

  return if @current_user || request.path_info == '/'
  handle_error(:not_authenticated, 'Not authenticated.')
end

after do
  pass unless content_type == 'application/json' && !response.body.empty?
  body JSON.parse(response.body[0]).to_camelback_keys.to_json
end
