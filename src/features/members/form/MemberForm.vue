<script setup>
import Button from "@/components/Button.vue";
import { Form } from "@/components/new_form_builder";
import { Input, Select } from "@/components/new_form_elements";
import icons from "@/utils/icons";
import { GENDERS } from "@/utils/utils";
import { ref, shallowRef } from "vue";

const props = defineProps({
  member: Object,
  onSubmit: {
    type: Function
  }
});

function submitForm({ values }) {
  props.onSubmit(values)
}
</script>
<template>
  <!--<Input
    :value="member?.cbhiId"
    name="firstName"
    label="Household CBHI Id"
    validation="required|max-25"
    :attributes="{
      placeholder: 'Enter CBHI Id',
    }"
  />-->
  <Form v-slot="{ submit }" id="membres-form" class="grid cols-3 gap-4">
    <Input
      :value="member?.firstName"
      name="firstName"
      label="First Name"
      validation="required|max-25|alpha"
      :attributes="{
        placeholder: 'Enter First Name',
      }"
    />
    <Input
      :value="member?.fathersName"
      name="fathersName"
      label="Father's Name"
      validation="required|max-25|alpha"
      :attributes="{
        placeholder: 'Enter Father\'s Name',
      }"
    />
    <Input
      :value="member?.gradFathersNames"
      name="gradFathersNames"
      label="Grand Father's Name"
      validation="required|max-25|alpha"
      :attributes="{
        placeholder: 'Enter Grand Father\'s Name',
      }"
    />
    <div class="col-span-3 gap-4 grid grid-cols-4">
      <Select
        :value="member?.gender"
        name="gender"
        :options="Object.values(GENDERS)"
        label="gender"
        validation="required"
        :attributes="{
          placeholder: 'Select Gender',
          type: 'text',
        }"
      />
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
      <Select
        :value="member?.ketena"
        name="ketena"
        label="Ketena"
        validation="required"
        :options="['Others']"
        :attributes="{
          placeholder: 'Select Ketena',
          type: 'text',
        }"
      />
      <Input
        :value="member?.houseNo"
        name="houseNo"
        label="House Number"
        validation="required"
        :attributes="{
          placeholder: 'Enter House Number',
        }"
      />
      <Select
        :value="member?.profession"
        name="profession"
        :options="['Other']"
        label="Profession"
        validation="required"
        :attributes="{
          placeholder: 'Select Profession',
          type: 'text',
        }"
      />
      <Select
        :value="member?.membershipType"
        name="membershipType"
        label="Membership Type"
        validation="required"
        :options="['Others']"
        :attributes="{
          type: 'text',
          placeholder: 'Select Membership Type',
        }"
      />
      <Select
        :value="member?.status || 'Active'"
        name="membershipStatus"
        label="Membership Status"
        validation="required"
        :options="['Active', 'Pending', 'Suspended']"
        :attributes="{
          type: 'text',
          placeholder: 'Select Membership Status',
        }"
      />
    </div>
    <Input
      :value="member?.phoneNumber"
      name="phoneNumber"
      label="Phone Number"
      validation="required|phone"
      :attributes="{
        placeholder: 'Enter Phone Number',
      }"
    />
    <Input
      :value="member?.idNumber"
      name="idNumber"
      label="Id Number"
      validation="required|num"
      :attributes="{
        placeholder: 'Enter Id Number',
      }"
    />
    <Input
      :value="member?.generatedCBHIHouseholdID"
      name="generatedCBHIHouseholdID"
      label="Generated CBHI  Household ID"
      validation="required|num"
      :attributes="{
        placeholder: 'Enter CBHI  Household ID',
      }"
    />
    <div class="col-span-3 flex justify-end">
      <Button @click.prevent="submit(submitForm)" type="primary" class="flex items-center gap-2 justify-center">
        <i v-html="icons.plus" />
        Add Member To Move Forward
      </Button>
    </div>
  </Form>
</template>
<style>
.cols-3 {
  grid-template-columns: 3;
}
</style>
