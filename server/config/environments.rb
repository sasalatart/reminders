database_config = {
  adapter: 'postgresql',
  encoding: 'unicode',
  pool: 5,
  username: 'postgres'
}

configure :development do
  set :database,
      database_config.merge(database: 'REMINDERS_development', host: 'localhost')
end

configure :production do
  set :database,
      database_config.merge(database: 'REMINDERS_production', host: 'postgres_db')
end
