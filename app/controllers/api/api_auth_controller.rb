class Api::ApiAuthController < ActionController::Base
  before_action :check_same_user?

  private

  def check_same_user?
    unless @current_user
      render json: { error: 'You have to login', status: 400 }, status: 400
    end
  end

  def params_page_check(params)
    case params[:page].to_s
    when 'next'
      params[:total].to_i
    when 'previous'
      1
    when ''
      1
    else
      params[:page].to_i
    end
  end
end
