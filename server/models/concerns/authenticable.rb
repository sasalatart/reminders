require 'active_support'
require 'jwt'

module Authenticable
  extend ActiveSupport::Concern

  included do
    before_validation :downcase_email
  end

  module ClassMethods
    def find_by_jwt(jwt)
      return false unless jwt

      decoded_token = JWT.decode(jwt, ENV['HMAC_SECRET'], true, algorithm: 'HS256')
      payload, _header = decoded_token
      User.find_by(token: payload['token'])
    end
  end

  def authenticate_and_generate_token(password)
    return false unless authenticate(password)
    update(token: generate_token)
  end

  def logout
    update(token: nil)
  end

  def generate_token
    loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless self.class.exists?(token: random_token)
    end
  end

  def generate_jwt
    JWT.encode({ token: token }, ENV['HMAC_SECRET'], 'HS256')
  end

  private

  def downcase_email
    self.email = self.email&.downcase
  end
end
