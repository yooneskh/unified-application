<script setup>

const props = defineProps({
  icon: String,
  title: String,
  description: String,
  text: String,
  classes: String,
  startButtons: Array,
  endButtons: Array,
});

const emit = defineEmits([
  'resolve',
]);


/* button handling */

async function handleButtonClick(button) {

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

    <p v-if="props.text">
      {{ props.text }}
    </p>

    <template #footer>
      <div class="flex gap-2">
        <u-button
          v-for="(button, index) of props.startButtons" :key="button.value || index"
          v-bind="button"
          :class="button.classes"
          loading-auto
          @click="handleButtonClick(button)"
        />
        <div class="grow" />
        <u-button
          v-for="(button, index) of props.endButtons" :key="button.value || index"
          v-bind="button"
          :class="button.classes"
          loading-auto
          @click="handleButtonClick(button)"
        />
      </div>
    </template>

  </u-card>
</template>