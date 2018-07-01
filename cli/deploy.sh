#!/bin/bash

mv .env .env.local
mv .env.prod .env
yarn build
mv .env .env.prod
mv .env.local .env
rsync -az ./public/ xhen@calvinong.tech:/var/www/html/pokemon-quest-guide
