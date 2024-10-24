

export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  extends: [
    './domains/general',
    './domains/authentication',
    './domains/admin',
    './plugins/unified-app',
  ],
});
