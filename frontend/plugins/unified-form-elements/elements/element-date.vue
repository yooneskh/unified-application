<script setup>


/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* date */

const isOpened = ref(false);

const fieldTitle = computed(() => {

  if (!modelValue.value) {
    return
  };


  if (props.field.dateType === 'time') {
    return modelValue.value;
  }


  if (props.field.valueFormat) {
    return formatDate(modelValue.value, props.field.labelFormat ?? props.field.valueFormat, undefined, props.field.valueFormat);
  }

  if (props.field.labelFormat) {
    return formatDate(modelValue.value, props.field.labelFormat);
  }


  return modelValue.value;

});


const fieldValue = computed(() => {

  if (!modelValue.value) {
    return
  };


  if (props.field.dateType === 'time') {
    return modelValue.value;
  }


  return formatDate(modelValue.value, 'YYYY/MM/DD HH:mm', undefined, props.field.valueFormat);

});


function handleDateChange(newDate) {

  if (props.field.dateType === 'time') {
    modelValue.value = newDate.slice(newDate.indexOf(' ') + 1);
    return;
  }


  const epoch = parseDate(newDate, 'YYYY/MM/DD HH:mm');

  if (props.field.valueFormat) {
    modelValue.value = formatDate(epoch, props.field.valueFormat);
    return;
  }

  modelValue.value = epoch;

}


/* template */

const DatePicker = defineAsyncComponent(() =>
  import('vue3-persian-datetime-picker')
);

</script>


<template>
  <div>

    <u-input
      v-bind="radOmit(props.field, ['key', 'identifier', 'dateType'])"
      readonly
      :model-value="fieldTitle"
    />

    <u-dropdown>
      <date-picker
        format="YYYY/MM/DD HH:mm"
        :type="props.field.dateType"
        locale="en"
        inline
        class="
          [&>.vpd-input-group]:!hidden vpd-datepicker-form-element
          [&_.vpd-next]:flex [&_.vpd-next]:items-center [&_.vpd-next]:justify-center
          [&_.vpd-prev]:flex [&_.vpd-prev]:items-center [&_.vpd-prev]:justify-center
          [&_.vpd-time-column_svg]:m-auto
        "
        :model-value="fieldValue"
        @update:model-value="handleDateChange($event); isOpened = false;"
      />
    </u-dropdown>

  </div>
</template>
