object false

node :is_login do
  @is_login
end if @is_login

node :side_urls do
  @side_bar_urls.map do |side_url|
    { controller: side_url.controller, url: side_url.url, name: side_url.name, is_public: side_url.is_public }
  end
end

node :controller do
  @controller
end
