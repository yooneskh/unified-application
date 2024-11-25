<script setup>

const props = defineProps({
  icon: String,
  title: String,
  description: String,
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
  <u-card :class="props.classes">

    <template #header>
      <un-typography
        :icon="props.icon"
        :title="props.title"
        :description="props.description">
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

    <p v-if="props.text" class="mb-3">
      {{ props.text }}
    </p>

    <u-form
      :target="object"
      :fields="fields"
    />

    <template #footer>
      <div class="flex gap-2 justify-between">
        <u-button
          :label="props.submitLabel || 'Submit'"
          loading-auto
          @click="handleSubmit()"
        />
        <u-button
          variant="soft"
          color="neutral"
          :label="props.cancelLabel || 'Cancel'"
          loading-auto
          @click="emit('resolve')"
        />
      </div>
    </template>

  </u-card>
</template>