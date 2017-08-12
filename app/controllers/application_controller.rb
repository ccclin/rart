class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :current_user

  private

  def current_user
    return false if session["uuid"].nil?
    @@current_user ||= UserSession.find_by(uuid: session["uuid"])&.user
  end

  def current_user_exist?
    ![false, nil].include?(current_user)
  end
end
