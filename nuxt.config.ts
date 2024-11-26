// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  ssr: true,
  builder: "vite",

  // @ts-ignore
  devtools: {
      enabled: false
  },

  nitro: {
    compressPublicAssets: true
  },

  app: {
      head: {
          title: 'SolsticeLeaf',
          htmlAttrs: {
              lang: 'en',
          },
          meta: [
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { hid: 'description', name: 'description', content: '' },
              { name: 'format-detection', content: 'telephone=no' },
          ],
          link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://ik.imagekit.io/kiinse/8b283c0366762231-sticker-transformed.webp?updatedAt=1723924643048' }],
      },
  },

  css: [
      '~/assets/style/scss/main.scss',
      '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  plugins: [
      {
          src: '~/plugins/bootstrap.client.ts',
          mode: "client"
      }
  ],

  modules: [
      '@nuxtjs/i18n',
      '@nuxt/content',
      '@nuxtjs/device',
  ],

  //@ts-ignore
  i18n: {
      locales: [
          {
              code: 'en',
              file: 'en.json'
          },
          {
              code: 'ru',
              file: 'ru.json'
          }
      ],
      lazy: true,
      langDir: 'locale/',
      defaultLocale: 'en',
      parsePages: false,
      strategy: "no_prefix"
  },

  compatibilityDate: '2024-11-26'
})