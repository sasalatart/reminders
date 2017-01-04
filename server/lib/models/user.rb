# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string
#  password_digest :string
#  token           :string
#

require 'bcrypt'
require_relative './concerns/authenticable'

class User < ActiveRecord::Base
  include BCrypt
  include Authenticable

  validates :email, presence: true, uniqueness: true

  has_secure_password

  def to_json
    { email: email }
  end
end
