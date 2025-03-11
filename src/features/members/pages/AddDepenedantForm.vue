<script setup>
import dependantsIcon from "@/utils/dependantsIcon";
import DependantForm from "../form/DependantForm.vue";
import { useMemberForm } from "../store/membersFormStore";
import { genId } from "@/utils/utils";
import icons from "@/utils/icons";

const props = defineProps({
  next: {
    type: Function,
  },
  changeActive: {
    type: Function,
  },
});

const memberForm = useMemberForm();
function submit(values) {
  memberForm.addDependant({
    id: genId.next().value,
    ...values,
  });
}
</script>
<template>
  <div class="grid grid-cols-5 gap-4">
    <div class="col-span-3 border-r px-2">
      <DependantForm
        :member="memberForm.selectedDependant"
        :onSubmit="submit"
      />
    </div>
    <div class="col-span-2">
      <table class="text-left table-fixed w-full">
        <thead>
          <tr class="bg-base-clr *:p-3">
            <th class="w-4">#</th>
            <th class="">Fullname</th>
            <th>Gender</th>
            <th>Relationship</th>
						<th></th>
          </tr>
        </thead>
        <tbody>
					<template v-if="memberForm.form.dependants.length" >
						<tr class="even:bg-base-clr *:p-3" :key="dep.id" v-for="(dep, idx) in memberForm.form.dependants">
							<td>{{ idx + 1 }}</td>
							<td>
								{{ dep.firstName }}
							</td>
							<td>
								{{ dep.gender }}
							</td>
							<td>
								{{ dep.relationship }}
							</td>
							<td>
								<div class="flex items-center gap-2 px-2">
									<button @click="memberForm.selecteActiveDependant(dep.id)">
										<i v-html="icons.edit" />
									</button>
									<button>
										<i class="*:size-4 pb-1" v-html="icons.remove" />
									</button>
								</div>
							</td>
						</tr>
					</template>
          <tr v-else>
            <td colspan="4">
              <div class="grid place-items-center">
                <i class="*:size-48" v-html="dependantsIcon" />
                <p class="text-lg">No Dependatns Added</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
