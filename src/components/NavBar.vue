<script setup>
import { provide, ref, watch } from "vue";
import icons from "@/utils/icons";

const props = defineProps({
  modelValue: {
    type: String,
  },
  title: {
    Type: String,
  },
});

const inputData = ref("");
const emit = defineEmits(["update:modelValue"]);

watch(inputData, () => {
  emit("update:modelValue", inputData.value);
});
</script>
<template>
  <div class="flex justify-between items-center p-2 bg-[#F6F6FF]">
    <!-- <div tabindex="0" class="w-[20rem] focus-within:border-primary bg-white overflow-hidden shadow-primary h-full flex justify-end items-center border rounded-md">
					<span class="size-10 grid place-items-center" v-html='icons.search' />
					<input v-model="search" :placeholder="placeholder || 'Search...'" class=" flex-1 px-3 h-full" />
				</div> -->
     <div class='flex items-center gap-4'>
      <button v-ripple @click="$router.go(-1)"><i v-html="icons.back"/></button>
      <span class="capitalize text-lg font-bold">{{ props.title }}</span>
    </div> 
    <div class="flex gap-4 items-center">
  <i v-html="icons.notification" />
  <i v-html="icons.message" />
  <i v-html="icons.bire" />
  <div>
    <p class="font-Poppin">Birhane Araya</p>
    <p class="text-sm text-gray-500">Marketing Administrator</p>
  </div>
  <i v-html="icons.down" />
</div>

  </div>
</template>
