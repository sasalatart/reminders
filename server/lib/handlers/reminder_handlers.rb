get '/reminders' do
  reminders = {}
  reminders[:with_date] = @current_user.reminders.where.not(due_date: nil)
  reminders[:without_date] = @current_user.reminders.where(due_date: nil)

  json reminders: reminders
end

post '/reminders/create', allows: [:title, :body, :due_date] do
  reminder = Reminder.new(params)
  reminder.owner = @current_user

  respond_for_reminder(reminder.save, reminder)
end

put '/reminders/update/:id' do
end

post '/reminders/delete/:id' do
end

def respond_for_reminder(operation, reminder)
  if operation
    json reminder: reminder.to_json
  else
    status 406
    json message: reminder.errors.full_messages.join(', ')
  end
end
