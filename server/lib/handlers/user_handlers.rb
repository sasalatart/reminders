post '/signup' do
  user = User.new(email: params[:email],
                  password: params[:password],
                  password_confirmation: params[:password_confirmation])

  operation = user.save && user.authenticate_and_generate_token(params[:password])
  respond_for_user(operation, user)
end

post '/login' do
  user = User.find_by(email: params[:email])

  operation = user && user.authenticate_and_generate_token(params[:password])
  respond_for_user(operation, user, 'Invalid e-mail/password combination.')
end

get '/logout' do
  @current_user.logout
end
