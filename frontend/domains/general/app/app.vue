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
  <u-app>

    <nuxt-route-announcer />
    
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>

    <unified-dialogs-provider />

  </u-app>
</template>
