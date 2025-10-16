export default {
  ssr: true,
  target: 'server',

  head: {
    titleTemplate: '%s - Добрый кофе',
    title: 'Добрый кофе',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'
      }
    ]
  },

  css: [
    '~/assets/css/main.css'
  ],

  plugins: [
    '@/plugins/theme.client.js',
    '@/plugins/api.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: '/'
  },

  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: false,
      icons: 'mdi'
    },
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: '#FFD166',
          secondary: '#EEEEEE',
          accent: '#FFD166',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          text: '#000000',
          caption: '#787878'
        },
        dark: {
          primary: '#FFD166',
          secondary: '#2C2C2C',
          accent: '#FFD166',
          background: '#1E1E1E',
          surface: '#2C2C2C',
          text: '#FFFFFF',
          caption: '#B0B0B0'
        }
      }
    }
  },

  build: {
    extractCSS: true
  }
}
