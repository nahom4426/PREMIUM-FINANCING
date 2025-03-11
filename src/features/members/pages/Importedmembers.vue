<script setup>
import DefaultPage from '@/components/DefaultPage.vue';
import Table from '@/components/Table.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { useRoute } from 'vue-router';
import ImportedMembersDataProvider from '../components/ImportedMembersDataProvider.vue';
</script>
<template>
	<DefaultPage>
		<ImportedMembersDataProvider v-slot="{ members, pending }">
			<Table
				:pending="pending"
				:headers="{
					head: ['Fullname']
				}"
				:rows="members"
			/>
		</ImportedMembersDataProvider>
	</DefaultPage>
</template>