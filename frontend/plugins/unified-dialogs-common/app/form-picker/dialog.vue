<script setup lang="ts">

const props = defineProps<{
  icon: string,
  title: string,
  subtitle: string,
  text: string,
  classes: string,
  fields: any[],
  submitLabel: string,
  cancelLabel: string,
  handler: (form: any) => void,
}>();

const emit = defineEmits([
  'resolve',
]);


/* form */

const form = reactive({});

async function handleSubmit() {

  if (!props.handler) {
    emit('resolve', form);
    return;
  }


  try {
    await props.handler?.(form);
    emit('resolve', form);
  }
  catch { }

}

</script>


<template>
  <u-card
    :icon="props.icon"
    :title="props.title"
    :subtitle="props.subtitle"
    :text="props.text"
    :class="props.classes">

    <u-form
      :target="form"
      :fields="fields"
      class="my-4"
    />

    <div class="flex gap-2 justify-between mt-4">
      <u-btn
        :label="props.submitLabel || 'Submit'"
        loading-auto
        :click-handler="handleSubmit"
      />
      <u-btn
        :label="props.cancelLabel || 'Cancel'"
        class="soft"
        @click="emit('resolve')"
      />
    </div>

  </u-card>
</template>