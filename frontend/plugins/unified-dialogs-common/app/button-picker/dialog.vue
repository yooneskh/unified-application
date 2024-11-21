<script setup>

const props = defineProps({
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
  <div :class="props.classes">

    <p v-if="props.text">
      {{ props.text }}
    </p>

    <div class="flex gap-2 mt-4">

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

  </div>
</template>