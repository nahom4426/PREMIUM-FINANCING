<script setup>
import icons from "@/utils/icons";
import InputParent from "../new_form_builder/InputParent.vue";
//import Icon from "../Icon.vue";
import InputLayout from "./NewInputLayout.vue";

const props = defineProps({
  obj: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <InputParent v-slot="{ setRef, error, validation, value, attributes, changeValue }">
    <InputLayout
      :validation="validation"
      :class="$attrs.class + ' relative'"
      :error="error"
      :label="$attrs.label"
    >
      <div class="flex items-center h-full flex-1">
        <slot name="left"></slot>
        <select
          :style="{
            opacity: attributes?.placeholder && !value ? .6 : 1
          }"
          :ref="setRef"
          class="appearance-none flex-1  bg-[#eeeded2a] mt-3 mx-3  justify-center text-text-clr h-full text-sm"
        >
          <option
            selected
            value=""
            disabled
          >
            {{ attributes?.placeholder }}
          </option>
          <template v-if="!obj">
            <option
              class="text-sm px-4"
              :selected="value == option"
              :key="option"
              v-for="option in options"
            >
              {{ option }}
            </option>
          </template>
          <template v-else>
            <option
              :selected="value == option.value"
              :value="option.value"
              :key="option.value"
              v-for="option in options"
            >
              {{ option.label }}
            </option>
          </template>
        </select>
        <div class="absolute pointer-events-none top-0 right-0 h-full">
          <slot name="right">
            <div class="h-full ml-auto w-8 px-1 flex items-center justify-center">
              <i v-html="icons.down" />
            </div>
          </slot>
        </div>
      </div>
    </InputLayout>
  </InputParent>
</template>
