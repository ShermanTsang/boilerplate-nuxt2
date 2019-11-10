import config from './config'

export default {
  mode: 'universal',

  server: {
    port: config['server.port'],
    host: config['server.host']
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${config['site.name']}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: config['site.description'] },
      { hid: 'keywords', name: 'keywords', content: config['site.keywords'] }
    ],
    script: [
      (process.env.NODE_ENV === 'production' && config['3rd.baiduAnalyze.id'])
        ? { src: `https://hm.baidu.com/hm.js?${config['3rd.baiduAnalyze.id']}` }
        : {}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'favicon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#0a84ea' },

  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '@/assets/scss/global.scss',
    '@/assets/scss/animate.scss',
    '@/assets/scss/override.scss'
    // '@/assets/iconfont/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/HelpFunction', ssr: true },
    { src: '@/plugins/HttpLib', ssr: true },
    { src: '@/plugins/TransferDom', ssr: true },
    { src: '@/plugins/ComponentLoader', ssr: true },
    { src: '@/plugins/TimeLib', ssr: true },
    { src: '@/plugins/Lazyload', ssr: false },
    { src: '@/plugins/3rdAnalyze', ssr: false },
    { src: '@/plugins/Toast', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],

  /*
  ** Nuxt.js modules axios configuration
  */
  axios: {
    proxy: true
  },

  /*
  ** Proxy configuration
  */
  proxy: {
    '/api/': { target: `${config['api.protocol']}://${config['api.domain']}`, pathRewrite: { '^/api/': 'v1/' } },
    '/oss/': { target: `${config['oss.protocol']}://${config['oss.domain.https']}`, pathRewrite: { '^/oss/': '/' } }
  },

  /*
  ** Router configuration
  */
  router: {
    middleware: 'common'
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    extractCSS: true,
    maxChunkSize: 300000,
    postcss: {
      plugins: {
        'postcss-url': false
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // Add scss variables
      config.module.rules.forEach((rule) => {
        if (/scss/.test(rule.test.toString())) {
          rule.oneOf.forEach((item) => {
            item.use.push({
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                data: '@import "@/assets/scss/variables.scss";'
              }
            })
          })
        }
      })
    }
  }
}
