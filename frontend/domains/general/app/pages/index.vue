<script setup>

/* page */

definePageMeta({
  name: 'general.home',
});

useHead({
  title: '',
});

</script>


<template>
  <content-container class="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center gap-3">

    <p>
      Hello to Unified Components!
    </p>

    <nuxt-link to="https://github.com/yooneskh" target="_blank">
      <u-btn
        icon="i-mdi-github"
        label="Open Github"
        class="text-sm"
      />
    </nuxt-link>

  </content-container>
</template>
