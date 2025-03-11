<script setup>
import Button from "@/components/Button.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import MemberForm from "@/features/members/form/MemberForm.vue";
import icons from "@/utils/icons";
import { importInsured } from "../api/membersApi";
import { toasted } from "@/utils/utils";
import { ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import MembersFeeForm from "../form/MembersFeeForm.vue";
import { useMemberForm } from "../store/membersFormStore";

const props = defineProps({
  changeActive: {
    type: Function
  },
  next: {
    type: Function
  }
})

const memberForm = useMemberForm()

function onSubmit(values) {
  memberForm.form.member = values
  props.next()
}
</script>
<template>
  <div class="h-full flex flex-col justify-between">
    <MemberForm
      :member="memberForm.form.member"
      :onSubmit="onSubmit"
    />
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
