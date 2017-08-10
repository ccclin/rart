class Api::SignsController < Api::NoApiAuthController
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

  def destroy
  end

  # def index
  # end

  # def show
  #   @url = GifUrl.find_by(uuid: params[:uuid])
  #   redirect_to root_url and return if @url.nil?

  #   @url_user = @url&.user || Anonymous.new
  #   if @url_user.web_ads.exists?
  #     @web_ads = @url_user.web_ads.show_web_ads
  #   else
  #     @web_ads = User.boss.web_ads.show_web_ads
  #   end
  # end
end
