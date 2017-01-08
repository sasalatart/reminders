post '/signup' do
  user = User.new(email: params[:email],
                  password: params[:password],
                  password_confirmation: params[:password_confirmation])

  if user.save && user.authenticate_and_generate_token(params[:password])
    json user: user.to_json, jwt: user.generate_jwt
  else
    status 406
    json message: user.errors.full_messages.join(', ')
  end
end

post '/login' do
  user = User.find_by(email: params[:email])

  if user && user.authenticate_and_generate_token(params[:password])
    json user: user.to_json, jwt: user.generate_jwt
  else
    status 406
    json message: 'Invalid e-mail/password combination.'
  end
end

get '/logout' do
  @current_user.logout
end
