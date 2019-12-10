const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'universal',
  router: {
    middleware: 'skelton'
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      {
        name: "theme-color",
        content: "#2196F3"
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      }
    ],
    script: [{
        src: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML"
      },
      {
        type: "text/x-mathjax-config",
        src: "@/asset/mathjax.config"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#FFFFFF'
  },

  /*
   ** Global CSS
   */
  css: [{
    src: '@/assets/css/custom.scss'
  }],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '@/plugins/filter.js'
    },
    {
      src: '@/plugins/carousel.js',
      mode: 'client'
    },
    {
      src: '@/plugins/mathjax/index.client.js',
      ssr: false
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    '@nuxtjs/toast'
  ],
  vuetify: {
    treeShakes: true,
    customVariables: ['~/assets/css/app.scss'],
    optionsPath: "./vuetify.options.js",

  },
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /**
   * Pwa Modules
   */
  pwa: {
    workbox: {
      dev: false
    },
    meta: {
      theme_color: "#21CFF3"
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
