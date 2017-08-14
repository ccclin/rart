class Api::HomesController < Api::ApiAuthController
  def index
    @is_login = current_user_exist?
    @diskinfo = Other::Disk.new
    @side_bar_urls = KeyValues::SideBarUrl.pubilcs
    @controller = "#{params[:controller]}/#{params[:action]}"
  end
end
