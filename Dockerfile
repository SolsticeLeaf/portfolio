FROM node:16.15.0-slim

COPY /.output /nuxt/.output

RUN mkdir -p /nuxt/.output/server/content/projects
COPY /content/projects /nuxt/.output/server/content/projects

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "/nuxt/.output/server/index.mjs"]
