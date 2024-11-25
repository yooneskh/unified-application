<script setup>

/* interface */

const props = defineProps({
  icon: String,
  title: String,
  description: String,
});

</script>


<template>
  <div class="flex items-start">
    <div v-if="props.icon" class="text-2xl h-[32px] flex items-center justify-center me-3">
      <u-icon
        :name="props.icon"
      />
    </div>
    <div v-if="props.title || props.description" class="me-3">
      <div v-if="props.title" class="text-2xl font-bold">
        {{ props.title }}
      </div>
      <div v-if="props.description" class="opacity-75">
        {{ props.description }}
      </div>
    </div>
    <div class="grow" />
    <div v-if="$slots.append">
      <slot name="append" />
    </div>
  </div>
</template>