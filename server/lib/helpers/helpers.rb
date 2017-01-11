helpers do
  def errors_for(object)
    object.errors.full_messages.join(', ')
  end

  def respond_for_reminder(operation_success, reminder)
    raise NotAcceptableError, errors_for(reminder) unless operation_success
    json reminder: reminder.to_json
  end

  def respond_for_user(operation_success, user, error_message = errors_for(user))
    raise NotAcceptableError, error_message unless operation_success
    json user: user.to_json, jwt: user.generate_jwt
  end
end
