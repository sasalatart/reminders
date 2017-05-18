helpers do
  def errors_for(object)
    object.errors.full_messages.join(', ')
  end

  def status_code_for(status_code)
    case status_code
    when :not_authenticated then return 403
    when :not_found then return 404
    when :not_acceptable then return 406
    end

    500
  end

  def handle_error(status_code, message)
    halt status_code_for(status_code), json(message: message)
  end
end
