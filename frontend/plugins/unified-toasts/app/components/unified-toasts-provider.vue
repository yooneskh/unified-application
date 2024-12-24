<script setup>

/* toasts */

import { useToasts } from '../lib/use-toasts';
const toasts = useToasts();


/* actions */

function handleToastFinish(toast, isClick = false) {

  if (toast.clickHandler && isClick) {
    toast.clickHandler();
  }

  if (toast.closeHandler) {
    toast.closeHandler();
  }

  toasts.value.splice( toasts.value.indexOf(toast), 1 )

}


/* interface */

import FadingLinearProgress from '../atoms/fading-linear-progress.vue';

</script>


<template>
  <teleport to="body">
    <div class="flex flex-col items-end justify-end gap-2 pa-4 fixed inset-0 pointer-events-none z-[5000000]">
      <transition-group name="list">
        <u-alert
          v-for="toast of toasts" :key="toast.key"
          :icon="toast.icon"
          :title="toast.title"
          :subtitle="toast.subtitle"
          :text="toast.text"
          class="fill cursor-pointer relative pointer-events-auto max-w-lg overflow-clip"
          :class="[toast.classes]"
          title-classes="!text-[1em]"
          subtitle-classes="!text-[0.9em]"
          icon-classes="shrink-0 self-start text-[1em] mt-0.75"
          @click="handleToastFinish(toast, true)">
  
          <fading-linear-progress
            :duration="toast.duration || 5000000"
            class="absolute top-0 left-0"
            @finished="handleToastFinish(toast)"
          />
  
        </u-alert>
      </transition-group>
    </div>
  </teleport>
</template>


<style scoped>

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

</style>
