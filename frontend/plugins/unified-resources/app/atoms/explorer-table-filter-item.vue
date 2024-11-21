<script setup>

/* interface */

const props = defineProps({
  header: Object,
});

const emit = defineEmits([

]);

const modelValue = defineModel();


/* elements */

import ElementMedia from '../../../unified-form-elements/elements/element-media.vue';
import ElementResource from '../../../unified-form-elements/elements/element-resource.vue';

</script>


<template>
  <div class="p-2 min-w-40">

    <template v-if="props.header.ref === 'Media'">
      <element-media
        :field="{ label: 'Filter' }"
        v-model="modelValue"
      />
    </template>

    <template v-else-if="props.header.ref">
      <element-resource
        :field="{ label: 'Filter', resource: props.header.ref }"
        v-model="modelValue"
      />
    </template>

    <template v-else-if="props.header.items || props.header.enum">
      <u-form-field label="Filter">
        <u-select
          class="min-w-40"
          :items="props.header.items || props.header.enum"
          v-model="modelValue"
        />
      </u-form-field>
    </template>

    <template v-else-if="props.header.type === 'boolean'">
      <u-form-field label="Filter">
        <u-select
          class="min-w-40"
          :items="[
            { label: 'is true', value: '%true%' },
            { label: 'is false', value: '%false%' },
          ]"
          v-model="modelValue"
        />
      </u-form-field>
    </template>
  
    <template v-else>
      <u-form-field label="Filter">
        <u-input
          :type="props.header.type || 'text'"
          v-model="modelValue"
        />
      </u-form-field>
    </template>

  </div>
</template>