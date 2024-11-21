<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* template */

</script>


<template>
  <u-form-field
    v-bind="radPick(props.field, ['label', 'description', 'hint', 'help', 'size'])"
    :error="props.error ? props.messages?.join(' - ') : undefined">
    <u-input
      v-bind="radOmit(props.field, ['key', 'identifier', 'label', 'description', 'hint', 'help', 'size'])"
      class="block"
      v-model="modelValue"
    />
  </u-form-field>
</template>