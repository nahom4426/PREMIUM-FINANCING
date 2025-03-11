<script setup>
import Form from '@/components/new_form_builder/Form.vue';
import Input from '@/components/new_form_elements/Input.vue';
import WoredaInput from '../components/WoredaInput.vue';

const props = defineProps({
	subcity: Object,
})
</script>
<template>
	<Form :inner="false" id='subcity-form' class="grid col-span-3">
		<Input
			label="Sub City Name"
			name="subCityName"
			validation="required|max-25"
			:attributes="{
				placeholder: 'Enter Sub City Name'
			}"
			:value="subcity?.subCityName || ''"
		/>
		<div class="col-span-3 grid -col-start-3l gap-4">
			<p class="p-2 pt-4 text-base border-b">Add Woredas</p>
			<WoredaInput
				name="woredas"
				label="woreda Name"
				validation="array_length-12 Add At Least One Woreda"
				:attributes="{
					placeholder: 'Enter'
				}"
			/>
		</div>
	</Form>
</template>