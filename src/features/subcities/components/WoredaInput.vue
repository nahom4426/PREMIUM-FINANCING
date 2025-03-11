<script setup>
import Button from "@/components/Button.vue";
import InputParent from "@/components/new_form_builder/InputParent.vue";
import InputError from "@/components/new_form_elements/InputError.vue";
import icons from "@/utils/icons";
import { ref } from "vue";

const props = defineProps({
  validation: String,
  label: String,
});

const woredas = ref([]);

const w = ref("");
const input = ref();

function add() {
  if (w.value && !woredas.value.includes(el => el.woredaName == w.value)) {
    woredas.value.push({
			woredaName: w.value
		});
    w.value = "";
    input.value.focus();
  }
}

function remove(id) {
  const idx = woredas.value.findIndex((el) => el == id);
  if (idx > -1) {
    woredas.value.splice(idx, 1);
  }
}
</script>
<template>
  <InputParent
    :validation="validation"
    v-model="woredas"
    v-slot="{ setRef, error }"
  >
    <div :ref="setRef" class="flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <span
          :data-required="
            `${validation}`.includes('required') ? 'true' : 'false'
          "
          :title="label"
          class="text-sm capitalize px-1 truncate"
          v-if="label"
          >{{ label }}</span
        >
        <InputError :error="error" />
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4 max-w-[33%]">
          <input
            ref="input"
            v-model="w"
            placeholder="Enter Woreda name"
            class="px-3 flex-1 h-10 border rounded bg-base-clr"
          />
          <Button @click.prevent="add" type="primary"> Add Woreda </Button>
        </div>
        <div class="flex-1 p-4 border-t">
          <p v-if="!woredas.length">No Woredas Added</p>
          <div class="w-full flex flex-wrap gap-2" v-else>
            <div
              :key="wor"
              v-for="wor in woredas"
              class="shadow-xl border bg-dark/10 text-dark py-1 gap-4 rounded-full px-4 flex items-center"
            >
              <p class="">{{ wor.woredaName }}</p>
              <button
                @click.prevent="remove(wor)"
                class="grid place-items-center"
              >
                <i class="*:size-[10px]" v-html="icons.close" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </InputParent>
</template>
