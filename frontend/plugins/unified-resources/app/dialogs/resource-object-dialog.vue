<script setup>

/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([
  'resolve',
]);


/* resource */

const { fields } = useResourceMetaFields({
  resource: () => props.resource,
});

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});


/* object */

const object = ref({});
const objectClone = ref({});


const isCreating = computed(() =>
  !props.resourceId
);


onMounted(async () => {

  if (props.resourceId) {

    object.value = await retrieveResourceObject({
      resource: props.resource,
      resourceId: props.resourceId,
    });

    objectClone.value = JSON.parse(JSON.stringify(object.value));

  }

});


/* submission */

const cacher = useCacher();

async function submitObject() {

  if (JSON.stringify(object.value) === JSON.stringify(objectClone.value)) {
    return toastWarning({
      title: 'You have made no changes.',
    });
  }


  let method = 'post';
  let url = `/${resourceUrlPart.value}/`;
  let body = JSON.parse(JSON.stringify(object.value));

  if (!isCreating.value) {
    method = 'patch';
    url += object.value._id;
    delete body._id;
    delete body.createdAt;
    delete body.updatedAt;
  }


  const data = await ufetch(url, {
    method,
    body,
  });


  cacher.set(`resource.${props.resource}.${object.value._id}.object`, data);
  emit('resolve', data);

}

</script>


<template>
  <u-card>

    <template #header>
      <un-typography
        icon="i-mdi-folder"
        :title="`${isCreating ? 'Create a' : 'Update the'} ${props.resource}`"
        description="Enter the information in the form below.">
        <template #append>
          <u-button
            variant="ghost"
            color="neutral"
            icon="i-mdi-close"
            @click="emit('resolve')"
          />
        </template>
      </un-typography>
    </template>

    <u-form
      :target="object"
      :fields="fields"
    />

    <template #footer>
      <div class="flex justify-between">
        <u-button
          :icon="isCreating ? 'i-mdi-plus' : 'i-mdi-pencil'"
          :label="`${isCreating ? 'Create a' : 'Update the'} ${props.resource}`"
          loading-auto
          @click="submitObject()"
        />
        <u-button
          variant="soft"
          color="neutral"
          label="Cancel"
          @click="emit('resolve')"
        />
      </div>
    </template>

  </u-card>
</template>