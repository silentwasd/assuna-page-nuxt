export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: ['nuxt-icon'],

    postcss : {
        plugins: {
            tailwindcss : {},
            autoprefixer: {},
        },
    },

    ssr: false
})