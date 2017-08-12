# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           default(""), not null
#  password_digest :string           default(""), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_secure_password

  has_many :user_sessions

  def new_session
    user_sessions.create(uuid: SecureRandom.uuid, expired_at: 1.months.from_now)
  end
end
