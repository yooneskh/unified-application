<script setup>


/* interface */

const props = defineProps({
  resource: String,
  resourceId: String,
});

const emit = defineEmits([

]);


/* resource */

const { resource: item } = useResourceObject({
  resource: () => props.resource,
  resourceId: () => props.resourceId,
});


/* title */

const { title, refresh: refreshitemTitle } = useResourceTitle({
  resource: () => props.resource,
  resourceId: () => props.resourceId,
});


/* view */

async function showResource() {

  const result = await launchResourceObjectDialog({
    resource: props.resource,
    resourceId: props.resourceId,
  });

  if (!result) {
    return;
  }


  refreshitemTitle();

}

</script>


<template>
  <template v-if="props.resource === 'Media'">
    <u-popover mode="hover">
      <a target="_blank" :href="item?.path" class="whitespace-nowrap text-sm text-primary underline flex items-center gap-2">
        <img
          v-if="item?.type?.startsWith('image')"
          :src="item?.variants?.small ?? item?.path"
          class="w-[32px] h-[32px] rounded-md inline-block object-contain"
        />
        Media
    </a>
    <template v-if="item?.type?.startsWith('image')" #content>
      <img
        :src="item.variants?.small ?? item.path"
        class="w-[150px] border shadow-md"
      />
    </template>
    </u-popover>
  </template>
  <template v-else>
    <span
      class="whitespace-nowrap text-sm text-primary underline cursor-pointer me-2"
      @click="showResource()">
      {{ title }}
    </span>
  </template>
</template>