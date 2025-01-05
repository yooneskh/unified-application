<script setup>

const config = useAppConfig();


/* seo */

useHead({
  titleTemplate: t => `${t ? `${t} - ` : ''}${config.brand.title}`,
});

useSeoMeta({
  'description': 'Applications description.',
  'og:image': '/favicon.ico',
  'twitter:card': 'summary',
});

</script>


<template>

  <nuxt-route-announcer />
  
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>

  <unified-toasts-provider />
  <!-- <unified-dialogs-provider /> -->

</template>


<style>
  :root {
    color: theme('colors.on-surface');
    background-color: theme('colors.surface');
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .btn {
    justify-content: center;
  }
</style>