# == Schema Information
#
# Table name: user_sessions
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  uuid       :string
#  expired_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserSession < ApplicationRecord
  belongs_to :user


  def self.is_exprie?(uuid = "")
    if us = find_by(uuid: uuid)
      if us.expired_at < Time.current
        us.destroy
        us = nil
      end
    end

    us
  end
end
