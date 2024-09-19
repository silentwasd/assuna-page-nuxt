// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxt/ui"],
  ssr: false,

  i18n: {
    locales: ["en-US", "ru-RU", "ja-JP"],
    defaultLocale: "ru-RU",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
    strategy: 'no_prefix'
  },

  app: {
    head: {
      script: [{
        src: '/js/metrics.js'
      }]
    }
  },

  compatibilityDate: "2024-09-19",
})