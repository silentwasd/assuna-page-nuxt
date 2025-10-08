// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

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

    // 👇 Добавляем runtimeConfig для API
    runtimeConfig: {
        public: {
            apiBase: 'https://back.assunayuuki.ru'
        }
    }
});