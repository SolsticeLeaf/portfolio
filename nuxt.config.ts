const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  app: {
    pageTransition: false,
    layoutTransition: false,
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
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://ik.imagekit.io/kiinse/icons/icon.svg?updatedAt=1740170186956' }]
    }
  },
  routeRules: {
    '/**': {
      prerender: true,
      cache: {
        swr: true,
        maxAge: 120,
        staleMaxAge: 60,
        headersOnly: true
      }
    }
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/**': { isr: false },
    },
  },
  experimental: {
    viewTransition: true,
    renderJsonPayloads: true,
  },
  sourcemap: true,
  compatibilityDate: '2025-01-29',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/device', '@nuxt/icon', '@nuxt/fonts', 'nuxt-umami'],
  icon: {
    serverBundle: {
      collections: ['arcticons', 'mdi', 'ic', 'pixelarticons', 'line-md', 'f7', 'codex', 'pixel']
    }
  },
  plugins: ['@/plugins/Vue3Marquee.client.ts'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
    lazy: true,
    langDir: 'locales',
    bundle: {
      optimizeTranslationDirective: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'prefix',
    defaultLocale: 'en',
  },
  css: ['@/assets/scss/global.scss', '@/assets/scss/screens.scss', '@/assets/scss/themes/dark.scss', '@/assets/scss/themes/light.scss'],
  umami: {
    id: process.env.UMAMI_ID,
    host: process.env.UMAMI_HOST,
    autoTrack: true,
  },
  runtimeConfig: {
    public: {
      CRYPTOCLOUD_SHOP_ID: process.env.CRYPTOCLOUD_SHOP_ID,
      UMAMI_ID: process.env.UMAMI_ID,
      UMAMI_HOST: process.env.UMAMI_HOST,
      DATABASE_NAME: process.env.DATABASE_NAME,
      DATABASE_URL: process.env.DATABASE_URL
    },
    private: {
      CRYPTOCLOUD_API_KEY: process.env.CRYPTOCLOUD_API_KEY
    }
  },
})
