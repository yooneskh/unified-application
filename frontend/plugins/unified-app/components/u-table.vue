<script setup>

/* interface */

const props = defineProps({
  headers: Array,
  items: Array,
  itemKey: {
    type: String,
    default: '_id',
  },
  actions: Array,
  actionsTitle: {
    type: String,
    default: 'Actions',
  },
  rowAction: Function,
  selectedItems: Array,
});

</script>


<template>
  <div class="w-full overflow-x-auto border border-[var(--ui-border)] rounded-[var(--ui-radius)] overflow-clip">
    <table class="w-full">
  
      <thead class="border-b border-[var(--ui-border)]">
        <tr>
  
          <th v-for="header of props.headers" :key="header.key">
            <slot name="header" :header="header">
              <div class="text-sm text-start px-2 py-1 whitespace-nowrap">
                <slot name="header-name" :header="header" :label="radTitle(header.key)">
                  <span :class="header.headerClasses">
                    {{ header.label || radTitle(header.key) }}
                  </span>
                </slot>
              </div>
            </slot>
          </th>
  
          <th v-if="props.actions?.length > 0" class="text-sm text-center p-2">
            {{ props.actionsTitle }}
          </th>
  
        </tr>
      </thead>
  
      <tbody>
        <tr v-if="!( props.items?.length > 0 )">
          <td colspan="999" class="text-center p-6">
            No items to show.
          </td>
        </tr>
        <tr
          v-for="row of props.items" :key="row[props.itemKey]"
          class="transition hover:bg-[var(--ui-text)]/10 odd:bg-[var(--ui-text)]/5"
          :class="{
            'bg-primary/15': props.selectedItems?.includes(row[props.itemKey]),
            'cursor-pointer': !!props.rowAction,
          }"
          @click="props.rowAction?.(row)">
  
          <td
            v-for="header of props.headers" :key="header.key"
            class="text-start px-2 py-1">
  
            <slot name="item" :header="header" :item="row" :data="row[header.key]">
              <slot :name="`item-${header.key}`" :item="row" :data="row[header.key]">
                <span :class="header.bodyClasses">
                  {{ row[header.key] }}
                </span>
              </slot>
            </slot>
  
          </td>
  
          <td v-if="props.actions?.length > 0">
            <div class="flex items-center justify-center gap-1 px-2">
              <div v-for="(action, index) of props.actions" :key="action.key">
                <u-tooltip :text="action.label">
                  <u-button
                    variant="ghost"
                    :icon="action.icon"
                    :color="action.color"
                    size="xs"
                    class="whitespace-nowrap"
                    :class="action.classes"
                    loading-auto
                    @click.stop="action.handler?.(row, index)">
                    <span class="md:hidden">
                      {{ action.label }}
                    </span>
                  </u-button>
                </u-tooltip>
              </div>
            </div>
          </td>
  
        </tr>
      </tbody>
  
    </table>
  </div>
</template>