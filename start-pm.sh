#!/usr/bin bash

npm i
npm run build
pm2 start pm-start.json
pm2 save