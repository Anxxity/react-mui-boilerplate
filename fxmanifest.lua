fx_version 'cerulean'
game 'gta5'

name 'react-fivem-mui-example'
author 'example'
description 'NUI example with React + MUI + command open + ESC close'
version '1.0.0'

ui_page 'web/dist/index.html'

files {
  'web/dist/index.html',
  'web/dist/*',
  'web/dist/assets/*'
}

client_scripts {
  'client/client.lua'
 
}

server_scripts{
 'server/server.lua'
}