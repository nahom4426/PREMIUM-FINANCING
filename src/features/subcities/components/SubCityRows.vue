<script setup>
import icons from "@/utils/icons";
import { genId } from "@/utils/utils";
import { computed, ref } from "vue";

const props = defineProps({
  rowData: {
    type: Array,
    required: true,
  },
  firstCol: {
    type: Boolean,
    default: false,
  },
  rowKeys: {
    type: Array,
    required: true,
  },
  headKeys: {
    type: Array,
    default: [],
  },
  cells: Object,
});

const withId = computed(() => {
  return props.rowData.map((el) => ({ id: genId.next().value, ...el }));
});
const emit = defineEmits(["row"]);

const openedRows = ref([]);

function toggle(id) {
  const idx = openedRows.value.findIndex((el) => el == id);
  if (idx > -1) {
    openedRows.value.splice(idx, 1);
  } else {
    openedRows.value.push(id);
  }
}

const active = ref('')
function changeActive(name) {
  active.value = name
}

</script>
<template>
  <template :key="index" v-for="(row, index) in withId">
    <tr
      :class="[!openedRows.includes(row.id) && 'border-b-[0.2px]']"
      @click="emit('row', row)"
      class="odd:bg-base-clr hover:bg-base-clr text-sm cursor-pointer"
    >
      <td v-if="firstCol" class="p-3">
        <slot name="select" :row="row" />
      </td>
      <td class="p-2 opacity-80">{{ index + 1 }}</td>
      <td class="p-2 max-w-40 opacity-80" :key="key" v-for="key in rowKeys">
        <span class="text-sm" v-if="!Object.keys(cells || {}) || !cells?.[key]">
          {{
            key.split(".").reduce((all, el) => {
              return all?.[el];
            }, row)
          }}
        </span>
        <component
          v-else-if="Object.keys(cells || {}) && cells[key].com"
          :row="row"
          :is="cells[key].com"
          v-bind="
            Array.isArray(cells[key].props)
              ? cells[key].props.reduce((props, prop) => {
                  props[prop.name] = row[prop.value];
                  return props;
                }, {})
              : {}
          "
        />
        <span v-else-if="typeof cells[key] == 'function'">
          {{ cells[key](row?.[key], row) }}
        </span>
      </td>
      <td
        class="p-3 flex items-center gap-2"
        v-if="headKeys.find((head) => head.toLowerCase() == 'actions')"
      >
        <button class="p-1 px-2 rounded rounded-r border-r flex items-center gap-2" @click="toggle(row.id)">
          Woredas <i v-html="icons.down" />
        </button>
        <button class="p-1 px-2 rounded flex items-center gap-2" @click="toggle(row.id)">
          <i v-html="icons.edit" />
          Edit
        </button>
      </td>
    </tr>
    <tr
      :class="[openedRows.includes(row.id) && 'border-b-[0.2px]']"
      v-if="openedRows.includes(row.id)"
    >
      <td colspan="3">
        <p class="p-2 border-b">Woredas</p>
        <div class="w-full flex flex-wrap gap-2 p-2">
          <div
            :key="wor"
            v-for="wor in row.woredas"
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
      </td>
    </tr>
  </template>
</template>
