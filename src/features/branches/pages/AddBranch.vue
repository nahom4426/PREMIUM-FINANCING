<script setup>
  import Button from '@/components/Button.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import icons from '@/utils/icons';
// import { importInsured } from '../api/woredaApi';
import { toasted } from '@/utils/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import WoredaForm from '@/features/branches/form/WoredaForm.vue';

const importReq = useApiRequest()
const progress = ref();
const router = useRouter()




</script>
<template>
	<div class="p-4 flex flex-col gap-4 bg-white h-full">
		<WoredaForm />
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
		content: attr(data-per) '%';
		margin-left: -2.5rem;
		padding: 3px;
		color: white;
	}
</style>