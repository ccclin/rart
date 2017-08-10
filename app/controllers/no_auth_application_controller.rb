class NoAuthApplicationController < ApplicationController
  before_action :do_only_unregistration

  private

  def do_only_unregistration
    redirect_to root_path and return if @current_user
  end
end
