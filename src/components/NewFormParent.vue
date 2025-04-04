<script setup>
import { closeModal } from "@customizer/modal-x";
import Button from "./Button.vue";
import ResponseError from "./ResponseError.vue";
const props = defineProps({
  size: {
    type: String,
    default: "md",
  },
  title: {
    required: true,
    type: String,
  },
  goBack: {
    type: Boolean,
    default: false,
  },
  onGoBack: {
    type: Function,
  },
  error: {
    type: String,
  },
});
</script>
<template>
  <div
    :class="[$style[size]]"
    class="overflow-hidden flex flex-col justify-between bg-white rounded-md"
  >
    <div
      class="flex justify-between border-b border-text-secondary-clr/30 items-center"
    >
      <div class="flex items-center gap-4">
        <button
          @click="onGoBack"
          v-if="goBack"
          class="grid place-items-center rounded-md border border-text-clr"
        >
        </button>
        <p class="font-bold text-lg px-4 p-3">{{ title }}</p>
      </div>
      <div class="flex items-center gap-4">
        <slot name="right-actions"></slot>
        <button class="border rounded-full" @click="closeModal()">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.7803 7.96965C8.48741 7.67676 8.01253 7.67676 7.71964 7.96965C7.42675 8.26255 7.42675 8.73742 7.71964 9.03031L9.68932 11L7.71966 12.9697C7.42677 13.2625 7.42677 13.7374 7.71966 14.0303C8.01255 14.3232 8.48743 14.3232 8.78032 14.0303L10.75 12.0607L12.7196 14.0303C13.0125 14.3232 13.4874 14.3232 13.7803 14.0303C14.0732 13.7374 14.0732 13.2625 13.7803 12.9696L11.8106 11L13.7803 9.03033C14.0732 8.73744 14.0732 8.26257 13.7803 7.96968C13.4874 7.67678 13.0125 7.67678 12.7196 7.96968L10.75 9.93933L8.7803 7.96965Z" fill="#1C274C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 0.25C4.81294 0.25 0 5.06294 0 11C0 16.9371 4.81294 21.75 10.75 21.75C16.6871 21.75 21.5 16.9371 21.5 11C21.5 5.06294 16.6871 0.25 10.75 0.25ZM1.5 11C1.5 5.89137 5.64137 1.75 10.75 1.75C15.8586 1.75 20 5.89137 20 11C20 16.1086 15.8586 20.25 10.75 20.25C5.64137 20.25 1.5 16.1086 1.5 11Z" fill="#1C274C"/>
</svg>

        </button>
      </div>
    </div>
    <div
      class="flex flex-col gap-4 form-scrollbar flex-1 overflow-auto p-2 border-b border-text-secondary-clr/30"
    >
      <slot />
      <ResponseError :error="error" />
    </div>
    <slot name="bottom" />
  </div>
</template>

<style module>
.md {
  width: 40rem;
  height: 100%;
}

.lg {
  width: 60rem;
  height: 100%;
}

.xl {
  width: 100%;
  height: 100%;
}

.xs {
  width: auto;
  height: auto;
}
</style>

<style>
.form-layout {
  display: grid;
}
.form-scrollbar::-webkit-scrollbar {
  display: block;
  width: 5px;
}

.form-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d1c9c9;
  border-radius: 50px;
}
</style>
