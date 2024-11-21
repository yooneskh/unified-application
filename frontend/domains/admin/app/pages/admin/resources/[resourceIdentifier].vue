<script setup>

const route = useRoute();


/* page */

definePageMeta({
  name: 'admin.resources',
  layout: 'admin',
  middleware: 'is-authenticated-admin',
});


/* resource */

import { singular } from 'pluralize';

const resourceIdentifier = computed(() =>
  route.params.resourceIdentifier
);

const resourceModel = computed(() =>
  radTitle(singular(resourceIdentifier.value)).replaceAll(' ', '')
);


/* seo */

useHead({
  title: computed(() => radTitle(resourceIdentifier.value)),
});

</script>


<template>
  <content-container>
    <resource-manager-card
      :resource="resourceModel"
      class="my-6"
    />
  </content-container>
</template>