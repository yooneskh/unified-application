<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();

</script>


<template>
  <u-checkbox
    v-bind="radOmit(props.field, ['key', 'identifier'])"
    v-model="modelValue"
  />
</template>