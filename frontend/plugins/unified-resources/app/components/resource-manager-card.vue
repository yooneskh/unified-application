<script setup>

import pluralize from 'pluralize';


/* interface */

const props = defineProps({
  icon: String,
  title: String,
  resource: String,
  extraObjectActions: Array,
});

const emit = defineEmits([

]);


/* meta */

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});


/* general */

const elExplorer = ref();


/* create */

async function handleCreate() {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
  });

  if (!result) {
    return;
  }


  refreshItems();

}


/* table actions */

const tableActions = computed(() => {

  const result = [];

  result.push({
    key: 'update',
    icon: 'i-mdi-pencil',
    label: 'Update',
    handler: handleItemUpdate,
  });

  result.push({
    key: 'delete',
    icon: 'i-mdi-delete',
    label: 'Delete',
    color: 'error',
    handler: handleItemDelete,
  });

  if (props.extraObjectActions) {
    result.push(...props.extraObjectActions);
  }

  return result;

});


async function handleItemDelete(item) {
  await launchButtonPickerDialog({
    icon: 'i-mdi-delete',
    title: `Delete ${props.resource}`,
    text: 'Are you sure you want to delete this?',
    startButtons: [
      {
        variant: 'soft',
        label: 'No, Cancel',
        color: 'neutral',
      },
    ],
    endButtons: [
      {
        label: 'Yes, Delete this',
        color: 'error',
        async handler() {

          await ufetch(`/${resourceUrlPart.value}/${item._id}`, {
            method: 'delete',
          });

          refreshItems();

        }
      },
    ],
  });
}


async function handleItemUpdate(item) {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
    resourceId: item._id,
  });

  if (!result) {
    return;
  }


  refreshItemsData();

}


/* actions */

function refreshItems() {
  elExplorer.value.refreshItems();
}

function refreshItemsData() {
  elExplorer.value.refreshItemsData();
}


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
});

</script>


<template>
  <section>

    <un-typography
      :icon="props.icon ?? 'i-mdi-table'"
      :title="props.title ?? `Manage ${radTitle(pluralize(props.resource))}`">
      <template #append>
        <u-button
          icon="i-mdi-plus"
          label="Create New"
          loading-auto
          @click="handleCreate()"
        />
      </template>
    </un-typography>

    <resource-explorer-table
      ref="elExplorer"
      :resource="props.resource"
      :actions="tableActions"
      class="mt-3"
    />

  </section>
</template>