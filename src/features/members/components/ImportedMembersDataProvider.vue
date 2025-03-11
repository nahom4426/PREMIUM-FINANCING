<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { useRoute } from 'vue-router';
import { getInsuredByWoreda } from '../api/membersApi';
import { toasted } from '@/utils/utils';

const route = useRoute()
const req = useApiRequest()

const woredaUuid = route.params.woredaUuid

req.send(
	() => getInsuredByWoreda(woredaUuid),
	res => {
		toasted(res.success, '')
	}
)
</script>
<template>
	<slot
		:members='req.response.value || []'
		:pending="req.pending.value"
		:error="req.error.value"
	/>
</template>