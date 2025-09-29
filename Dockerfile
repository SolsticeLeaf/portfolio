FROM node:23

COPY /.output /nuxt/.output
COPY ./i18n /nuxt/i18n

CMD ["node", "/nuxt/.output/server/index.mjs"]
