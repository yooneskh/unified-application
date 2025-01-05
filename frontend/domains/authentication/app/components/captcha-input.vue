<script setup>

/* interface */

const captchaId = defineModel('captchaId');
const captchaText = defineModel('captchaText');


/* captcha */

const { data: captchaData, refresh } = useUFetch(`/captcha-tokens/`, {
  method: 'post',
  server: false,
});

watch(() => captchaData.value?.captchaId, () => {
  captchaId.value = captchaData.value?.captchaId;
  captchaText.value = '';
}, { immediate: true });

</script>


<template>
  <div>

    <u-input
      label="Enter the number below"
      inputmode="numeric"
      class="block"
      v-model="captchaText"
    />

    <div class="flex items-center justify-center gap-1 mt-3">

      <img
        :src="captchaData?.captchaData"
        class="rounded"
      />

      <u-btn
        icon="i-mdi-refresh"
        tabindex="-1"
        class="ghost"
        @click="refresh();"
      />

    </div>

  </div>
</template>