// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Inter': [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  },

  app: {
    head: {
      title: 'Sistem Peminjaman Barang',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  typescript: {
    strict: true
  },

  compatibilityDate: '2024-12-19'
})