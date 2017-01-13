get '/reminders' do
  reminders = {}
  reminders[:with_date] = @current_user.reminders.where.not(due_date: nil)
  reminders[:without_date] = @current_user.reminders.where(due_date: nil)

  json reminders: reminders
end

get '/reminders/:id' do
  reminder = Reminder.find_by(id: params[:id])
  handle_error(:not_found, 'Reminder not found.') unless reminder

  json reminder: reminder.to_json
end

post '/reminders/create', allows: [:title, :body, :due_date] do
  reminder = Reminder.new(params)
  reminder.owner = @current_user

  if reminder.save
    json reminder: reminder.to_json
  else
    handle_error :not_acceptable, errors_for(reminder)
  end
end

put '/reminders/update', allows: [:id, :title, :body, :due_date] do
  reminder = Reminder.find_by(id: params[:id])
  handle_error(:not_found, 'Reminder not found.') unless reminder

  if reminder.update(params)
    json reminder: reminder.to_json
  else
    handle_error :not_acceptable, errors_for(reminder)
  end
end

post '/reminders/delete' do
  reminder = Reminder.find_by(id: params[:id])
  handle_error(:not_found, 'Reminder not found.') unless reminder && reminder.destroy

  json reminder: reminder.to_json
end
