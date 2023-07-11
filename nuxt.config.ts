import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  ssr:false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxt/image-edge',
  ],
  apollo: {
    autoImports: true,
    authType: 'Bearer',
    authHeader: 'Authorization',
    tokenStorage: 'cookie',
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:5565/v1/graphql',
        wsEndpoint: 'ws://localhost:5565/v1/graphql',
       

      },
      authClient: {
        httpEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:5565/v1/graphql',
        wsEndpoint: 'ws://localhost:5565/v1/graphql',
        tokenName: 'auth-token',
        inMemoryCacheOptions:{
          typePolicies: {
            Subscription: {
              fields: {
                contacts: {
                  merge(existing, incoming) {
                    return [...existing, ...incoming]
                  }
                }
              }
            }
          }
       }
   
    },
  },
},
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    public: {
      end_point: process.env.GRAPHQL_ENDPOINT,
    },
  }
})