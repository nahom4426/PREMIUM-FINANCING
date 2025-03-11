<script setup>
import Button from "@/components/Button.vue";
import Form from "@/components/new_form_builder/Form.vue";
import { Input, Select } from "@/components/new_form_elements";
import icons from "@/utils/icons";
import { GENDERS } from "@/utils/utils";

const props = defineProps({
	member: Object,
  onSubmit: {
    type: Function
  }
})

function submitForm({ values, reset }) {
  props.onSubmit({
    ...(props.member || {}),
    ...values
  })
  reset()
}

console.log(props.member);

</script>
<template>
  <Form v-slot="{ submit }" id="dependan-form" class="grid grid-cols-2 gap-4">
    <Input
      :value="member?.firstName || ''"
      name="firstName"
      label="First Name"
      validation="required|max-25|alpha"
      :attributes="{
        placeholder: 'Enter First Name',
      }"
    />
    <Input
      :value="member?.fathersName || ''" 
      name="fathersName"
      label="Father's Name"
      validation="required|max-25|alpha"
      :attributes="{
        placeholder: 'Enter Father\'s Name',
      }"
    />
    <div class="col-span-2 gap-4 grid grid-cols-3">
      <div class="col-span-2 gap-2">
        <Input
          :value="member?.gradFathersNames || ''"
          name="gradFathersNames"
          label="Grand Father's Name"
          validation="required|max-25|alpha"
          :attributes="{
            placeholder: 'Enter Grand Father\'s Name',
          }"
        />
      </div>
      <Select
        :value="member?.gender || ''"
        name="gender"
        :options="Object.values(GENDERS)"
        label="gender"
        validation="required"
        :attributes="{
          placeholder: 'Select Gender',
          type: 'text',
        }"
      />
      <div class="col-span-2 gap-2">
        <Input
          :value="member?.dateOfBirth"
          name="dateOfBirth"
          label="Date of Birth"
          validation="required"
          :attributes="{
            type: 'date',
            placeholder: 'Enter Grand Father\'s Name',
          }"
        >
          <template #left>
            <div class="min-w-10 h-full grid place-items-center">
              <i v-html="icons.calender" />
            </div>
          </template>
        </Input>
      </div>
      <Input
        :value="member?.phoneNumber || ''"
        name="phoneNumber"
        label="Phone Number"
        validation="required|phone"
        :attributes="{
          placeholder: 'Enter Phone Number',
        }"
      />
      <div class="col-span-2 gap-2">
        <Input
          :value="member?.idNumber || ''"
          name="idNumber"
          label="Id Number"
          validation="required|num"
          :attributes="{
            placeholder: 'Enter Id Number',
          }"
        />
      </div>
      <Select
        :value="member?.relationship || ''"
        name="relationship"
        :options="['Other']"
        label="Relationship"
        validation="required"
        :attributes="{
          placeholder: 'Select Relationship',
          type: 'text',
        }"
      />
    </div>
		<Button @click.prevent="submit(submitForm)" class="col-span-2 text-white flex !justify-center bg-dark">
			Add Dependent
		</Button>
  </Form>
</template>
