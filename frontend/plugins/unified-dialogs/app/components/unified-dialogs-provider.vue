<script setup>

/* dialogs */

import { useDialogs } from '../states/dialogs';
const dialogs = useDialogs();


/* remove */

function removeDialog(dialog) {

  dialog.modelValue = false;

  setTimeout(() => {
    dialogs.value.splice(
      dialogs.value.findIndex(it => it.key === dialog.key),
      1
    );
  }, 500);

}

</script>


<template>
  <u-modal
    v-for="dialog of dialogs" :key="dialog.key"
    v-bind="dialog.options"
    :open="dialog.modelValue"
    @update:open="dialog.resolve(undefined); removeDialog(dialog);">
    <template v-if="dialog.options?.title || dialog.options?.description" #body>
      <component
        :is="dialog.component"
        v-bind="dialog.props"
        @resolve="dialog.resolve($event); removeDialog(dialog);"
        @reject="dialog.reject($event); removeDialog(dialog);"
      />
    </template>
    <template v-else #content>
      <component
        :is="dialog.component"
        v-bind="dialog.props"
        @resolve="dialog.resolve($event); removeDialog(dialog);"
        @reject="dialog.reject($event); removeDialog(dialog);"
      />
    </template>
  </u-modal>
</template>