<script setup>

/* interface */

const props = defineProps({
  field: Object,
  success: Boolean,
  error: Boolean,
  messages: Array,
});

const modelValue = defineModel();


/* file */

import MediaGallery from '../atoms/media-gallery.vue';


const loading = ref(false);
const mediaObject = ref(undefined);

const fieldText = computed(() =>
  !mediaObject.value ? '' : `${mediaObject.value.name}.${mediaObject.value.extension}`
);


async function openMediaSelector() {

  const result = await launchDialog({
    component: MediaGallery,
    options: {
      title: 'Media Gallery',
      description: 'Select media from your gallery.',
      class: '!max-w-5xl',
    },
  });

  if (!result) {
    return;
  }


  modelValue.value = result;

}


watch(modelValue, async () => {

  mediaObject.value = undefined;

  if (!modelValue.value) {
    return;
  }


  const data = await ufetch(`/media/${modelValue.value}`, {
    loading,
  });


  mediaObject.value = data;

}, { immediate: true });

</script>


<template>
  <!-- <template #append>
      <nuxt-link
        v-if="mediaObject && mediaObject.type?.startsWith('image')"
        :href="mediaObject.path"
        target="_blank"
        class="flex items-center gap-2 pe-4"
        @click.stop>

        <img
          :src="mediaObject.variants?.small ?? mediaObject.path"
          class="h-[32px] w-[32px] inline-block object-contain"
        />
  
        <u-btn
          icon="i-mdi-open-in-new"
          class="soft primary pointer-events-none"
        />
  
        <u-dropdown trigger="hover">
          <img
            :src="mediaObject.variants?.small ?? mediaObject.path"
            class="w-[256px]"
          />
        </u-dropdown>
  
      </nuxt-link>
    </template> -->
  <u-input
    inner-icon="i-mdi-file"
    v-bind="radOmit(props.field, ['key', 'identifier'])"
    :loading="props.field.loading || loading"
    readonly
    :model-value="fieldText"
    @click="openMediaSelector()"
  />
</template>