object false

node :is_login do
  @is_login
end if @is_login

node :diskinfo do
  { available_gb: @diskinfo.available_gb.round(2),
    total_gb: @diskinfo.total_gb.round(2),
    percent: @diskinfo.percent }
end

node :side_urls do
  @side_bar_urls.map do |side_url|
    { controller: side_url.controller, url: side_url.url, name: side_url.name, is_public: side_url.is_public }
  end
end

node :controller do
  @controller
end
