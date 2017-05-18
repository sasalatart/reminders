# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string
#  password_digest :string
#  token           :string
#  created_at      :datetime
#  updated_at      :datetime
#

require 'bcrypt'
require_relative './concerns/authenticable'

class User < ActiveRecord::Base
  include BCrypt
  include Authenticable

  has_many :reminders, dependent: :destroy

  validates :email, presence: true,
                    uniqueness: true,
                    format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i,
                              message: 'must have correct format' }

  has_secure_password

  def to_json
    { email: email }
  end
end
