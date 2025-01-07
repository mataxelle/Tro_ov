// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  build: {
    transpile: ['@popperjs/core', 'bootstrap']
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  plugins : [
    {src:  '~/plugins/bootstrap.js', mode: 'client'},
  ],

  modules: ['@nuxt/image']
})