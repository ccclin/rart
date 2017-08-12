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

end
