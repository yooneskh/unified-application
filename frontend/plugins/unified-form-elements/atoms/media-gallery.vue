<script setup>

const user = useUser();


/* interface */

const props = defineProps({

});

const emit = defineEmits([
  'resolve',
]);


/* media */

const { pending, data: mediaList, refresh } = useUFetch(`/media/`, {
  query: {
    filter: computed(() => `owner:eq:${user.value._id}`),
    sort: 'createdAt:-1',
  },
});

const allExtensions = computed(() =>
  [...new Set( mediaList.value?.map(it => it.extension) )]
);


const query = ref('');
const selectedExtension = ref(undefined);

const queriedMediaList = computed(() =>
  mediaList.value?.filter(it =>
    ([it.name, it.extension].join(' ').toLowerCase().includes(query.value.toLowerCase())) &&
    (!selectedExtension.value || (it.extension === selectedExtension.value))
  )
);


/* upload */

const elFile = ref();
const loading = ref(false);
const progress = ref(0);
const allFilesToUpload = ref(0);
const currentUploadingFileIndex = ref(0);


async function handleFilesSelected(files) {

  if (!files?.length) return;

  loading.value = true;
  allFilesToUpload.value = files.length;

  for (const file of files) {
    try {
      currentUploadingFileIndex.value++;
      await uploadSingleFile(file);
      confettiOnPageSides(500);
    }
    catch (error) {

      loading.value = false;
      console.error(error);

      toastDanger({
        title: 'Upload failed. Please try again. ' + error.message,
      });

      return;

    }
  }

  loading.value = false;

  toastSuccess({
    title: 'All files were uploaded successfully.',
  });

}

async function uploadSingleFile(file) {
  return new Promise((resolve, reject) => {

    const payload = new FormData();
    payload.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', useAppConfig().http.apiUrl + '/media/upload', true);
    xhr.setRequestHeader('Authorization', useToken().value);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        progress.value = (event.loaded / event.total) * 100;
      }
    };

    xhr.onload = () => {
      refresh();
      resolve();
    };

    xhr.onerror = () => {
      reject();
    };

    progress.value = 0;
    xhr.send(payload);

  });
}

async function deleteFile(media) {
  launchButtonPickerDialog({
    title: 'Delete Media',
    text: 'Are you sure you want to delete this media?',
    startButtons: [
      {
        label: 'Delete Media',
        color: 'error',
        handler: async () => {

          await ufetch(`/media/${media._id}`, {
            method: 'delete',
          });
        
          refresh();

        },
      },
    ],
    endButtons: [
      {
        label: 'No, Do not delete',
        color: 'neutral',
      },
    ],
  });
}

async function deleteAllCurrentMediaList() {
  launchButtonPickerDialog({
    title: 'Delete All Current Media List',
    text: 'Are you sure you want to delete all media in current media list? Only those media that are visible in the media gallery right now will be deleted.',
    options: {
      containerClasses: 'max-w-md',
    },
    startButtons: [
      {
        label: 'Delete All Current Media List',
        color: 'error',
        handler: async () => {
          for (const item of queriedMediaList.value) {

            await ufetch(`/media/${item._id}`, {
              method: 'delete',
            });

            refresh();

          }
        },
      },
    ],
    endButtons: [
      {
        label: 'No, Do not delete',
        color: 'neutral',
      },
    ],
  });
}

</script>


<template>
  <div>

    <div class="flex items-start gap-2">

      <u-input
        placeholder="Search"
        v-model="query"
      />

      <u-select
        v-if="allExtensions?.length > 0"
        placeholder="Filter File Type"
        :items="allExtensions.map(it => ({ label: it, value: it }))"
        v-model="selectedExtension"
      />

      <div class="flex items-center gap-1 ms-auto">

        <template v-if="loading">
          <span class="text-xs font-mono opacity-50 me-4">
            <span class="me-2">{{ currentUploadingFileIndex }}/{{ allFilesToUpload }}</span>
            <span class="whitespace-pre">%{{ progress?.toFixed(0).padEnd(3) }}</span>
          </span>
        </template>

        <u-button
          icon="i-mdi-upload"
          label="Upload new media"
          :loading="loading || pending"
          @click="elFile.click()"
        />

        <u-dropdown-menu
          :items="[
            {
              type: 'label',
              label: 'Dangerous actions'
            },
            {
              label: 'Delete all current media list',
              icon: 'i-mdi-delete-alert',
              color: 'error',
              disabled: !(queriedMediaList?.length > 0),
              onSelect: deleteAllCurrentMediaList,
            },
          ]"
          >
          <u-button
            variant="soft"
            icon="i-mdi-dots-vertical"
          />
        </u-dropdown-menu>

      </div>

      <input
        ref="elFile"
        :key="loading"
        type="file"
        multiple
        class="hidden"
        @change="handleFilesSelected($event?.target.files)"
      />

    </div>

    <div v-if="pending && !(mediaList?.length > 0)" class="p-6 text-xs text-center">
      Loading ...
    </div>
    <div v-else-if="!pending && mediaList.length === 0" class="p-3 text-xs text-center">
      You have not uploaded any media yet.
    </div>

    <div v-else class="grid grid-cols-3 md:grid-cols-9 gap-1 mt-3">
      <div
        v-for="item of queriedMediaList" :key="item._id"
        class="relative cursor-pointer interactive"
        @click="emit('resolve', item._id)">
        <u-popover mode="hover" :open-delay="0">

          <div class="w-full aspect-square">
            <img
              v-if="item.type?.startsWith('image')"
              :src="item.path"
              class="w-full aspect-square object-cover rounded"
            />
            <u-icon
              v-else
              name="i-mdi-file-outline"
              size="64"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-4/6"
            />
            <p class="absolute bottom-0 left-0 right-0 bg-black p-1 text-xs text-white whitespace-nowrap overflow-hidden text-ellipsis rounded-b">
              {{ item.name }}.{{ item.extension }}
            </p>
          </div>

          <template #content>
            <div class="p-2 text-sm">
              <p>
                {{ item.name }}.{{ item.extension }}
              </p>
              <p>
                {{ (item.size / 1024 / 1024).toFixed(2) }} MB
              </p>
              <p>
                {{ formatDate(item.createdAt) }}
              </p>
              <div class="space-x-1 mt-2">
                <u-button
                  icon="i-mdi-trash-can"
                  color="error"
                  size="xs"
                  loading-auto
                  @click="deleteFile(item)"
                />
              </div>
            </div>
          </template>

        </u-popover>

      </div>
    </div>

  </div>
</template>