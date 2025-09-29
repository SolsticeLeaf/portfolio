FROM node:24.0.0-alpine

COPY /.output /nuxt/.output
COPY ./i18n /nuxt/i18n

CMD ["node", "/nuxt/.output/server/index.mjs"]
