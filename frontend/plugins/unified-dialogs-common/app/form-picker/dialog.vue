<script setup>

const props = defineProps({
  text: String,
  classes: String,
  fields: Array,
  submitLabel: Array,
  cancelLabel: Array,
  handler: Function,
});

const emit = defineEmits([
  'resolve',
]);


/* form */

const form = reactive({});

async function handleSubmit() {

  if (!props.handler) {
    emit('resolve', form);
    return
  }


  try {
    await props.handler?.(form);
    emit('resolve', form);
  }
  catch { }

}

</script>


<template>
  <div :class="props.classes">

    <p v-if="props.text">
      {{ props.text }}
    </p>

    <pre>{{ props.fields }}</pre>

    <div class="flex gap-2 mt-4">

      <u-button
        :label="props.submitLabel || 'Submit'"
        loading-auto
        @click="handleSubmit()"
      />
      
      <div class="grow" />

      <u-button
        variant="soft"
        color="neutral"
        :label="props.cancelLabel || 'Cancel'"
        loading-auto
        @click="emit('resolve')"
      />

    </div>

  </div>
</template>