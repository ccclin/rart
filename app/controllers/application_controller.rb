class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :current_user

  private

  def current_user
    return nil if session["uuid"].nil?
    @@current_user ||= UserSession.is_exprie?(session["uuid"])&.user
  end

  def current_user_exist?
    !current_user.nil?
  end
end
