export default defineNuxtConfig({
  app: {
    head: {
      title: 'SolsticeLeaf',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: "viewport",
          content: "width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
        },
        { key: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://ik.imagekit.io/kiinse/icons/icon.svg?updatedAt=1740170186956' }]
    }
  },
  compatibilityDate: '2025-01-29',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@nuxt/image',
    '@vesp/nuxt-fontawesome',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt'
  ],
  plugins: ['@/plugins/Vue3Marquee.client.ts'],
  i18n: {
    vueI18n: '@/config/i18n.config.ts',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский' },
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
  },
  css: ['@/assets/scss/global.scss'],
  runtimeConfig: {
    public: {
      CRYPTOCLOUD_SHOP_ID: process.env.CRYPTOCLOUD_SHOP_ID
    },
    private: {
      CRYPTOCLOUD_API_KEY: process.env.CRYPTOCLOUD_API_KEY
    }
  }
})