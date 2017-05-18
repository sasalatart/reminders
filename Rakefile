namespace :prod do
  task :install do
    sh 'bundle install --without development test'
    sh 'cd client && npm i && npm run build'
  end
end

namespace :dev do
  task :install do
    sh 'bundle'
    sh 'cd client && npm i'
  end

  task :start_front do
    sh 'cd client && npm start'
  end
end

namespace :db do
  task :reset do
    sh 'cd server && rake db:drop && rake db:create && rake db:migrate'
  end
end
