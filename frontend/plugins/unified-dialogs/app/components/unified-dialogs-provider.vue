<script setup>

/* dialogs */

import { useDialogs } from '../states/dialogs';
const dialogs = useDialogs();


/* remove */

async function resolveDialog(dialog, value) {

  removeDialog(dialog);

  if (dialog.onResolve) {
    await dialog.onResolve(value);
  }

  dialog.resolve(value);

}

async function rejectDialog(dialog, value) {

  removeDialog(dialog);

  if (dialog.onReject) {
    await dialog.onReject(value);
  }

  dialog.reject(value);

}

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
  <u-dialog
    v-for="dialog of dialogs" :key="dialog.key"
    v-bind="dialog.options"
    :model-value="dialog.modelValue"
    @update:model-value="resolveDialog(dialog, undefined)">
    <component
      :is="dialog.component"
      v-bind="dialog.props"
      @resolve="resolveDialog(dialog, $event);"
      @reject="rejectDialog(dialog, $event);"
    />
  </u-dialog>
</template>