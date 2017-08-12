class Api::HomesController < Api::ApiAuthController
  def index
    @is_login = current_user_exist?
  end
end
