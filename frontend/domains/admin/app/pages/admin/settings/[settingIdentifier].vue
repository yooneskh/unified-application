<script setup>

const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.settings',
  layout: 'admin',
  middleware: 'is-authenticated-admin',
});


/* resource */

import { singular } from 'pluralize';

const settingIdentifier = computed(() =>
  route.params.settingIdentifier
);

const settingModel = computed(() =>
  radTitle(singular(settingIdentifier.value)).replaceAll(' ', '')
);


/* seo */

useHead({
  title: computed(() => radTitle(settingIdentifier.value)),
});

</script>


<template>
  <content-container>
    <setting-manager-card
      :resource="settingModel"
      class="my-6"
    />
  </content-container>
</template>