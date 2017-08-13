class Api::HomesController < Api::ApiAuthController
  def index
    @is_login = current_user_exist?
    @diskinfo = Other::Disk.new
  end
end
