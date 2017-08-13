object false

node :is_login do
  @is_login
end if @is_login

node :diskinfo do
  { available_gb: @diskinfo.available_gb.round(2),
    total_gb: @diskinfo.total_gb.round(2),
    percent: @diskinfo.percent }
end
