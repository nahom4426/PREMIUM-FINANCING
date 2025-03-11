<script setup>
import Form from '@/components/new_form_builder/Form.vue';
import Input from '@/components/new_form_elements/Input.vue';
import NewFormParent from '@/components/NewFormParent.vue';
import SubCItyForm from '../form/SubCItyForm.vue';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';
import { useForm } from '@/components/new_form_builder/useForm';
import { useApiRequest } from '@/composables/useApiRequest';
import { createSubcity } from '../api/subcityApi';
import { useSubcity } from '../store/subcityStore';
import { toasted } from '@/utils/utils';

const props = defineProps({
	subcity: Object,
})

const { submit } = useForm('subcity-form')
const req = useApiRequest()
const subcityStore = useSubcity()

function create({values}) {
	req.send(
		() => createSubcity(values),
		res => {
			if(res.success) {
				subcityStore.add(res.data)
			}
			toasted(res.success, 'Created Successfully', res.error)
		}
	)
}
</script>
<template>
	<NewFormParent size='xl' title="Add Sub City">
		<SubCItyForm
			
		/>
		<template #bottom>
			<div class="flex justify-end">
				<Button :pending="req.pending.value" @click="submit(create)" type="primary" class="m-2 flex gap-2 justify-center">
					<i v-html="icons.plus" class="pb-1" />
					Add Sub City
				</Button>
			</div>
		</template>
	</NewFormParent>
</template>