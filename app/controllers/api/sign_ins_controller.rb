class Api::SignInsController < Api::NoApiAuthController
  def create
    user = User.find_by(username: params[:user][:user_name]).try(:authenticate, params[:user][:password])
    if user
      user_session = user.new_session
      session["uuid"] = user_session.uuid
      @@current_user = user
      @is_login = true
    else
      @error_message = "User not found"
    end
  end
end
