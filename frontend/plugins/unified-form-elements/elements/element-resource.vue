<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* resource */

const loading = ref(false);

const { title } = useResourceArrayTitles({
  resource: () => props.field.resource,
  resourceIds: computed(() => props.field.multiple ? modelValue.value : modelValue.value ? [modelValue.value] : []),
});


async function selectResource() {

  const selecteds = await launchResourceSelectionDialog({
    resource: props.field.resource,
    multiple: props.field.multiple,
    resourceIds: !modelValue.value ? [] : Array.isArray(modelValue.value) ? modelValue.value : [modelValue.value],
  });

  if (!selecteds) {
    return;
  }


  if (props.field.multiple) {
    modelValue.value = selecteds;
  }
  else {
    modelValue.value = selecteds[0];
  }

}

</script>


<template>
  <u-input
    v-bind="radOmit(props.field, ['key', 'identifier'])"
    class="block"
    readonly
    :loading="props.field.loading || loading"
    :model-value="title"
    @click="selectResource()"
  />
</template>