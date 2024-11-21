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
  <u-form-field
    v-bind="radPick(props.field, ['hint', 'help', 'fieldLabel'])"
    :error="props.error ? props.messages?.join(' - ') : undefined">
    <u-checkbox
      v-bind="radOmit(props.field, ['key', 'identifier', 'hint', 'help', 'fieldLabel'])"
      v-model="modelValue"
    />
  </u-form-field>
</template>