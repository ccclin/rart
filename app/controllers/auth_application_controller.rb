class AuthApplicationController < ApplicationController
  before_action :check_authenticate_user!

  private

  def check_authenticate_user!
    unless current_user
      redirect_to sign_path
    end
  end
end
