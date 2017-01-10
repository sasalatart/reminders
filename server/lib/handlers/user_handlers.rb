post '/signup' do
  user = User.new(email: params[:email],
                  password: params[:password],
                  password_confirmation: params[:password_confirmation])

  operation = user.save && user.authenticate_and_generate_token(params[:password])
  respond_for_user(operation, user, user.errors.full_messages.join(', '))
end

post '/login' do
  user = User.find_by(email: params[:email])

  operation = user && user.authenticate_and_generate_token(params[:password])
  respond_for_user(operation, user, 'Invalid e-mail/password combination.')
end

def respond_for_user(operation, user, error_message)
  if operation
    json user: user.to_json, jwt: user.generate_jwt
  else
    status 406
    json message: error_message
  end
end

get '/logout' do
  @current_user.logout
end
