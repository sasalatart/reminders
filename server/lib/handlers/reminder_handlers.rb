get '/reminders' do
  reminders = {}
  reminders[:with_date] = @current_user.reminders.where.not(due_date: nil)
  reminders[:without_date] = @current_user.reminders.where(due_date: nil)

  json reminders: reminders
end

get '/reminders/:id' do
  reminder = Reminder.find_by(id: params[:id])
  raise(NotFoundError, Reminder.name) unless reminder

  json reminder: reminder.to_json
end

post '/reminders/create', allows: [:title, :body, :due_date] do
  reminder = Reminder.new(params)
  reminder.owner = @current_user

  respond_for_reminder(reminder.save, reminder)
end

put '/reminders/update', allows: [:id, :title, :body, :due_date] do
  reminder = Reminder.find_by(id: params[:id])
  raise(NotFoundError, Reminder.name) unless reminder

  respond_for_reminder(reminder.update(params), reminder)
end

post '/reminders/delete/:id' do
  reminder = Reminder.find_by(id: params[:id])
  raise(NotFoundError, reminder.class.name) unless reminder && reminder.destroy

  json reminder: reminder.to_json
end

def respond_for_reminder(operation, reminder)
  if operation
    json reminder: reminder.to_json
  else
    status 406
    json message: reminder.errors.full_messages.join(', ')
  end
end
