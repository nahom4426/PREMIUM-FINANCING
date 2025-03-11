<script setup>
import Button from "@/components/Button.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import MemberForm from "@/features/members/form/MemberForm.vue";
import icons from "@/utils/icons";
import { importInsured } from "../api/membersApi";
import { toasted } from "@/utils/utils";
import { computed, ref, shallowRef, watch } from "vue";
import { useRouter } from "vue-router";
import MembersFeeForm from "../form/MembersFeeForm.vue";
import DependantForm from "../form/DependantForm.vue";
import AddDepenedantForm from "./AddDepenedantForm.vue";
import { useMemberForm } from "../store/membersFormStore";
import AddMember from "./AddMember.vue";

const importReq = useApiRequest();
const progress = ref();
const router = useRouter();
const memberForm = useMemberForm()

let controller;
function importMembers(ev) {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();
  let file = ev.target.files[0];
  const fd = new FormData();
  fd.append("file", file);
  importReq.send(
    () =>
      importInsured(fd, {
        signal: controller.signal,
        onUploadProgress: (ev) => {
          const per = (ev.loaded / ev.total) * 100;
          progress.value.setAttribute("data-per", Math.floor(per));
          progress.value.style.setProperty("width", `${per}%`);
        },
      }),
    (res) => {
      toasted(res.success, "Sucessfully importted", res.error);
      if (res.success) {
        router.push(`/imported_members/${res.data?.woredaId}`);
      }
    }
  );
}

function cacelImport() {
  controller.abort();
}

const active = ref("Household Head");
const compos = shallowRef([
  {
    name: "Household Head",
    component: AddMember,
  },
  {
    name: "Dependant Form",
    component: AddDepenedantForm,
  },
  {
    name: "Payment",
    component: MembersFeeForm,
  },
]);

const activeComponent = computed(() => {
  return compos.value.find((el) => el.name == active.value);
});

function next() {
	const idx = compos.value.findIndex(el => el.name == active.value)
	if(idx > -1 && (idx + 1 <= compos.value.length - 1)) {
		active.value = compos.value[idx + 1].name
	}
	console.log(compos.value);
}

function prev() {
	const idx = compos.value.findIndex(el => el.name == active.value)
	if(idx > -1 && (idx - 1 >= 0)) {
		active.value = compos.value[idx - 1].name
	}
}

function changeActive(name) {
  active.value = name;
}

watch(compos, () => {
	console.log(compos.value);
})
</script>
<template>
  <div class="bg-white h-full flex flex-col justify-between overflow-hidden">
    <div class="flex flex-col gap-4 flex-1 overflow-y-scroll p-2">
      <div
        v-if="importReq.pending.value"
        class="backdrop-blur-sm w-full z-10 grid place-items-center fixed inset-0 bg-dark/40"
      >
        <div class="w-1/2 h-full p-4 flex flex-col justify-center">
          <div class="bg-white rounded p-4 flex items-center gap-2">
            <p>Importing Members</p>
            <div class="h-10 flex-1 rounded overflow-hidden bg-accent relative">
              <div
                ref="progress"
                class="progress flex-1 absolute rounded w-0 top-0 left-0 inset-0 bg-primary"
              />
            </div>
            <Button
              @click="cacelImport"
              class="border border-red-500 text-red-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div class="border-b py-2 flex items-center justify-between">
        <p class="font-semibold px-4 text-md">Adding New Member</p>
        <label>
          <p
            v-ripple
            class="cursor-pointer px-4 py-1 h-8 rounded flex items-center gap-2 border border-primary text-primary"
          >
            <i v-html="icons.import" />
            Import Members from .CSV file
            <input @change="importMembers" type="file" class="hidden" />
          </p>
        </label>
      </div>
			<KeepAlive>
				<component :next='next' :changeActive="changeActive" :is="activeComponent.component" />
			</KeepAlive>
    </div>
    <div class="min-h-12 border-t py-2 px-4 flex items-center">
      <Button @click='prev' class="border border-dark"> Previous </Button>
			<div class="flex-1 h-full gap-4 flex justify-center	 items-center">
				<template :key="com.name" v-for="(com, idx) in compos">
					<div :class="[active == com.name ? 'bg-primary text-white rounded px-4 py-2' : 'bg-gray-400 py-1 text-white rounded']" class='px-4'>
						{{ com.name }}
					</div>
					<div v-if="idx < compos.length - 1" class="h-[2px] rounded-full bg-dark w-20">
					</div>
				</template>
			</div>
      <Button v-if="Object.keys(memberForm.form.member).length" @click="next" class="bg-dark text-white"> Next </Button>
    </div>
  </div>
</template>
<style>
.progress {
  width: var(--width, 0%);
  display: flex;
  align-items: center;
  justify-content: end;
  transition: all 0.3s linear;
}

.progress::after {
  content: attr(data-per) "%";
  margin-left: -2.5rem;
  padding: 3px;
  color: white;
}


</style>
