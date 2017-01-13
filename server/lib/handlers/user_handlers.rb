post '/signup', allows: [:email, :password, :password_confirmation] do
  user = User.new(params)

  if user.save && user.authenticate_and_generate_token(params[:password])
    json user: user.to_json, jwt: user.generate_jwt
  else
    handle_error :not_acceptable, errors_for(user)
  end
end

post '/login' do
  user = User.find_by(email: params[:email])

  if user && user.authenticate_and_generate_token(params[:password])
    json user: user.to_json, jwt: user.generate_jwt
  else
    handle_error :not_acceptable, 'Invalid e-mail/password combination.'
  end
end

get '/logout' do
  @current_user.logout
end
