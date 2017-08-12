class Api::SignOutsController < Api::ApiAuthController
  def destroy
    current_user.user_sessions.where(uuid: session["uuid"]).destroy_all
    session["uuid"] = nil
    @@current_user = nil
  end
end
