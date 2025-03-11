<script setup>
  import { Form } from '@/components/new_form_builder'
  import { Input, Select } from '@/components/new_form_elements'
import icons from '@/utils/icons';

	const props = defineProps({
		member: Object
	})
</script>
<template>
	<Form id="membres-form" class="grid grid-cols-4 gap-4">
    
		<Select
			name="relationship"
			:options="['Other']"
			label="Relationship"
			validation="required"
			:attributes="{
				placeholder: 'Select Relationship',
				type: 'text'
			}"
		/>
		<Input
			:value="member?.gradFathersNames"
		  name="dateOfBirth"
			label="Date of Birth"
			validation="required"
			:attributes="{
				type: 'date',
				placeholder: 'Enter Grand Father\'s Name'
			}"
		>
			<template #left>
				<div class="min-w-10 h-full grid place-items-center">
					<i v-html="icons.calender" />
				</div>
			</template>
		</Input>
		<Select
			name="gender"
			:options="['Male', 'Female']"
			label="gender"
			validation="required"
			:attributes="{
				placeholder: 'Select Gender',
				type: 'text'
			}"
		/>
		<Input
			name="kebele"
			label="Kebele/Gote"
			validation="required"
			:attributes="{
				placeholder: 'Enter kebele/Gote',
				type: 'text'
			}"
		/>
	
		<div class="col-span-4 grid grid-cols-2 gap-4">
			<Select
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
	</Form>
</template>