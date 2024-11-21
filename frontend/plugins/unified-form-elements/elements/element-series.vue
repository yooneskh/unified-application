<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* actions */

function handleAddItem() {
  modelValue.value = [
    ...(Array.isArray(modelValue.value) ? modelValue.value : []),
    JSON.parse(JSON.stringify( props.field.itemBase ?? {} )),
  ];
}

function handleDuplicateItem(item, index) {
  modelValue.value = [
    ...(modelValue.value.slice(0, index + 1)),
    {
      ...modelValue.value[index],
      _id: undefined,
    },
    ...(modelValue.value.slice(index + 1)),
  ];
}

function handleDeleteItem(item, itemIndex) {
  modelValue.value = modelValue.value.filter((_, index) => itemIndex !== index);
}

function handleMoveItem(item, index, direction) {

  const items = [ ...modelValue.value ];
  const poppedItem = items.splice(index, 1)[0];

  items.splice(index + direction, 0, poppedItem);

  modelValue.value = items;

}

</script>


<template>
  <div class="ring ring-inset ring-[var(--ui-border-accented)] rounded-[calc(var(--ui-radius))]">

    <label class="text-sm font-medium text-[var(--ui-text)] flex items-center gap-2 py-2 px-3 border-b border-[var(--ui-border-accented)]">

      <span>
        {{ props.field.label }}
      </span>

      <span class="text-xs">
        ({{ (modelValue?.length > 0) ? (`${modelValue.length} items`) : ('No items') }})
      </span>

      <u-button
        variant="soft"
        icon="i-mdi-plus"
        label="New item"
        size="xs"
        @click="handleAddItem()"
      />

    </label>

    <template v-if="!modelValue || !(modelValue.length > 0)">
      <p class="text-xs text-center py-6">
        No Items
      </p>
    </template>

    <div
      v-else
      class="p-3 grid gap-3"
      :class="{
        'grid-cols-1': props.field.seriesColumns === 1 || !props.field.seriesColumns,
        'grid-cols-2': props.field.seriesColumns === 2,
        'grid-cols-3': props.field.seriesColumns === 3,
        'grid-cols-4': props.field.seriesColumns === 4,
        'grid-cols-5': props.field.seriesColumns === 5,
        'grid-cols-6': props.field.seriesColumns === 6,
      }">
      <div
        v-for="(item, index) of modelValue" :key="index"
        class="relative group">

        <u-form
          :target="item"
          :fields="props.field.itemFields"
          class="p-3 ring ring-inset ring-[var(--ui-border-accented)] rounded-[calc(var(--ui-radius))]"
        />

        <div class="absolute top-2 end-2 opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto flex gap-1">

          <u-button
            variant="soft"
            icon="i-mdi-content-copy"
            color="neutral"
            size="xs"
            @click="handleDuplicateItem(item, index)"
          />

          <u-button
            v-if="index > 0"
            variant="soft"
            icon="i-mdi-chevron-left"
            color="neutral"
            size="xs"
            @click="handleMoveItem(item, index, -1)"
          />

          <u-button
            v-if="index < modelValue.length - 1"
            variant="soft"
            icon="i-mdi-chevron-right"
            color="neutral"
            size="xs"
            @click="handleMoveItem(item, index, 1)"
          />

          <u-button
            variant="soft"
            icon="i-mdi-delete"
            color="error"
            size="xs"
            @click="handleDeleteItem(item, index)"
          />

        </div>

      </div>
    </div>

  </div>
</template>