# Reminders

[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](https://opensource.org/licenses/MIT)
[![Docker Automated buil](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/sasalatart/reminders)
[![](https://images.microbadger.com/badges/version/sasalatart/reminders.svg)](https://microbadger.com/images/sasalatart/reminders "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/image/sasalatart/reminders.svg)](https://microbadger.com/images/sasalatart/reminders "Get your own image badge on microbadger.com")
[![Code Climate](https://codeclimate.com/github/sasalatart/reminders/badges/gpa.svg)](https://codeclimate.com/github/sasalatart/reminders)

## About

This is an application built on top of [Sinatra](https://github.com/sinatra/sinatra) and [React](https://facebook.github.io/react/) that enables its users to keep track of their own reminders.

Currently available at https://reminders.salatart.com

## Setup

##### Development

1. Clone and cd into this repository
2. Set the `HMAC_SECRET` environment variable as any string (example: `export HMAC_SECRET=secret`)
3. cd into `server` and run `bundle install`
4. Run `rake db:create && rake db:migrate`
5. Run `shotgun config.ru`
6. Open a new shell
7. cd into `client` and run `npm install && npm start`

##### Docker

```sh
# Pull and run the application and PostgreSQL
$ docker run -d --name=postgres_db postgres:9.6.1

$ docker run -d --name=reminders -p 80:9292 -e HMAC_SECRET=any-secret \
                --link=postgres_db:postgres_db sasalatart/reminders

# Setup the database
$ docker exec reminders /bin/sh -c 'rake db:create; rake db:migrate'
```

The server's machine should now be redirecting its port 80 to the container's port 9292.
