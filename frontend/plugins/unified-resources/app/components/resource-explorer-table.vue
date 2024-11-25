<script setup>

/* interface */

const props = defineProps({
  resource: String,
  actions: Array,
  selectedResources: Array,
});


/* resource */

const { resourceUrlPart } = useResourceUrl({
  resource: () => props.resource,
});


/* meta */

const { meta } = useEnrichedMeta({
  resource: () => props.resource,
});


/* headers */

const headers = computed(() =>
  Object.entries(meta.value)
    .filter(it => !it[1].hideInTable)
    .map(it => ({
      ...it[1],
      key: it[0],
    }))
);


/* items */

const itemsInPage = ref(15);
const currentPage = ref(1);

const filters = ref({});
const sorts = ref({ 'createdAt': -1 });


const filtersQuery = computed(() =>
  Object.entries(filters.value)
    .filter(it => it[1])
    .map(it => `${it[0]}:${!isNaN(it[1]) ? 'is' : 'inc'}:${it[1]}`)
    .join(',')
);

const sortsQuery = computed(() =>
  Object.entries(sorts.value)
    .filter(it => it[1])
    .map(it => `${it[0]}:${it[1]}`)
    .join(',')
);

const { data: items, refresh: refreshItemsData } = useUFetch(
  computed(() => `${resourceUrlPart.value}/`),
  {
    query: {
      'filter': filtersQuery,
      'sort': sortsQuery,
      'skip': computed(() => (currentPage.value - 1) * itemsInPage.value),
      'limit': computed(() => itemsInPage.value),
    },
  }
);

const { data: itemsCount, refresh: refreshItemsCount } = useUFetch(
  computed(() => `${resourceUrlPart.value}/count`),
  {
    query: {
      'filters': filtersQuery,
    },
  }
);


const totalPages = computed(() =>
  Math.ceil(itemsCount.value / itemsInPage.value) || 1
);

watch(totalPages, () => {

  if (currentPage.value <= totalPages.value) {
    return;
  }

  currentPage.value = totalPages.value;

});


function refreshItems() {
  refreshItemsData();
  refreshItemsCount();
}


/* expose */

defineExpose({
  refreshItems,
  refreshItemsData,
  refreshItemsCount,
});


/* template */

import ExplorerTableCell from '../atoms/explorer-table-cell.vue';
import ExplorerTableFilterItem from '../atoms/explorer-table-filter-item.vue';

</script>


<template>
  <div>

    <un-table
      :headers="headers"
      :items="items"
      :selected-items="props.selectedResources"
      :actions="props.actions">

      <template #header-name="{ header, label }">

        <div class="flex items-center">

          <span class="me-2">
            {{ label }}
          </span>

          <u-button
            variant="ghost"
            :icon="sorts[header.key] === undefined ? 'i-mdi-arrow-up-down' : (sorts[header.key] === -1 ? 'i-mdi-arrow-down' : 'i-mdi-arrow-up')"
            color="neutral"
            size="xs"
            @click="sorts = { [header.key]: sorts[header.key] === undefined ? -1 : (sorts[header.key] === -1 ? 1 : undefined) }"
          />

          <u-popover v-if="!['createdAt', 'updatedAt'].includes(header.key)">
            <u-button
              variant="ghost"
              icon="i-mdi-filter"
              :color="filters[header.key] ? 'primary' : 'neutral'"
              size="xs"
            />
            <template #content>
              <explorer-table-filter-item
                :header="header"
                v-model="filters[header.key]"
              />
            </template>
          </u-popover>

        </div>


      </template>

      <template #item="{ header, data }">
        <explorer-table-cell
          :header="header"
          :data="data"
        />
      </template>

    </un-table>

    <div class="py-3 flex justify-between">
      <u-pagination
        size="sm"
        :total="itemsCount"
        :items-per-page="itemsInPage"
        v-model:page="currentPage"
      />
      <u-select
        :items="[ 5, 10, 15, 30 ]"
        v-model="itemsInPage"
        @update:model-value="currentPage = 1;"
      />
    </div>

  </div>
</template>