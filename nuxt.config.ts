// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  css: ["assets/css/tailwind.css","assets/index.css","assets/reset.css"],
  // autoImports: ['defineStore'],
  meta: {
      title: "Cosmo-n",
  },
  nitro: {
      preset: "firebase",
  },
  build: {
      postcss: {
          postcssOptions: {
              plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
              },
          },
      },
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiKey:'',
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'jhhuyjhj',
      appTitle: process.env.NUXT_APP_TITLE,
      baseUrl: process.env.BASE_URL,
      fbAId:process.env.NUXT_APP_FIREBASE_A_ID,
      fbKId:process.env.NUXT_APP_FIREBASE_K_ID,
      fbConfig:{
        apiKey: process.env.NUXT_APP_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NUXT_APP_FIREBASE_DB_URL,
        projectId: process.env.NUXT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_APP_FIREBASE_APP_ID,
        measurementId: process.env.NUXT_APP_FIREBASE_MEASUREMENT_ID,
      },
    }
  },
  // imports: {
  //   autoImport: false
  // }
})
// VUE_APP_GOOGLE_APPLICATION_CREDENTIALS="E:\Users\Andrey\Downloads\cosmo-n-firebase-adminsdk-vlm5n-6e4c654760.json"

