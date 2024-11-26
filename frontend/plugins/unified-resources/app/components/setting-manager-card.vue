<script setup>

import pluralize from 'pluralize';


/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
});


/* fields */

const { fields } = useResourceMetaFields({
  resource: () => props.resource,
});


/* object */

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});

const { data: object, refresh: refreshObject } = useUFetch(
  computed(() => `/${resourceUrlPart.value}/`)
);


/* submission */

async function submitSettings() {

  const body = {
    ...object.value,
    _id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };


  await ufetch(`/${resourceUrlPart.value}/`, {
    method: 'patch',
    body,
  });


  refreshObject();

  toastSuccess({
    title: 'Settings were saved.',
  });

}


/* template */

</script>


<template>
  <section>

    <un-typography
      :icon="props.icon ?? 'i-mdi-cog'"
      :title="props.title ?? `Configure ${radTitle(pluralize(props.resource))}`">
      <template #append>
        <u-button
          icon="i-mdi-upload"
          label="Save Settings"
          loading-auto
          @click="submitSettings()"
        />
      </template>
    </un-typography>

    <u-form
      v-if="object"
      :target="object"
      :fields="fields"
      class="mt-3"
    />

  </section>
</template>