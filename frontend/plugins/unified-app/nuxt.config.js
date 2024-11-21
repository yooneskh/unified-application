

export default defineNuxtConfig({
  devtools: false,
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-04-03',
  experimental: {
    headNext: true,
    typedPages: true,
  },
  sourcemap: {
    server: false,
    client: process.env.NODE_ENV === 'development',
  },
  css: [
    './assets/css/unified-base.css',
  ],
  extends: [
    '../unified-resources',
    '../unified-dialogs-common',
    '../unified-dialogs',
    '../unified-toasts',
    '../unified-forms',
    '../unified-network',
    'nuxt-unified-confetti',
  ],
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-radash',
  ],
  radash: {
    prefix: 'rad',
    prefixSkip: false,
  },
});
