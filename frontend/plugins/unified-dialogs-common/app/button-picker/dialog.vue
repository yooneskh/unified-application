<script setup lang="ts">

const props = defineProps<{
  icon?: string,
  title?: string,
  subtitle?: string,
  text?: string,
  classes?: string,
  startButtons?: { value: string; label?: string; icon?: string; classes?: string; handler?: () => void; }[],
  endButtons?: { value: string; label?: string; icon?: string; classes?: string; handler?: () => void; }[],
}>();

const emit = defineEmits([
  'resolve',
]);


/* button handling */

async function handleButtonClick(button: { value: string; label?: string; icon?: string; classes?: string; handler?: () => void; }) {

  if (!button.handler) {
    emit('resolve', button.value || button.label);
    return
  }


  try {
    await button.handler();
    emit('resolve', button.value || button.label);
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

    <div class="flex gap-2 mt-4">
      <u-btn
        v-for="(button, index) of props.startButtons" :key="button.value || index"
        v-bind="button"
        :class="button.classes"
        :click-handler="() => handleButtonClick(button)"
      />
      <div class="grow" />
      <u-btn
        v-for="(button, index) of props.endButtons" :key="button.value || index"
        v-bind="button"
        :class="button.classes"
        :click-handler="() => handleButtonClick(button)"
      />
    </div>

  </u-card>
</template>