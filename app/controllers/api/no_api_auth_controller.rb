class Api::NoApiAuthController < ActionController::Base
  before_action :do_only_unregistration

  private

  def do_only_unregistration
    if @current_user
      render json: { error: 'You are login', status: 400 }, status: 400
    end
  end
end
