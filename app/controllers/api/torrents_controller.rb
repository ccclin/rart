class Api::TorrentsController < Api::ApiAuthController
  def new
    @is_login = current_user_exist?
    @side_bar_urls = KeyValues::SideBarUrl.pubilcs
    @controller = "#{params[:controller]}/#{params[:action]}"
  end
end
