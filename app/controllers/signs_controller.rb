class SignsController < NoAuthApplicationController
  def show
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
