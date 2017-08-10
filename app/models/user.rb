class User < ApplicationRecord
  has_secure_password

  has_many :user_sessions

  def new_session
    user_sessions.create(uuid: SecureRandom.uuid, expired_at: 1.months.from_now)
  end
end
