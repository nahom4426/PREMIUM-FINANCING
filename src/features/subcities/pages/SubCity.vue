<script setup lang="ts">
import Button from '@/components/Button.vue';
import DefaultPage from '@/components/DefaultPage.vue';
import Table from '@/components/Table.vue';
import icons from '@/utils/icons';
import SubCitiesDataProvider from '../components/SubCitiesDataProvider.vue';
import SubCityRows from '../components/SubCityRows.vue';
</script>

<template>
	<DefaultPage>
		<template #more>
			<Button @click="$router.push('/add_sub_city')" type="primary" class="flex gap-3">
				<i v-html="icons.plus" />
				Add Sub City
			</Button>
		</template>
		<SubCitiesDataProvider v-slot="{ subcities, pending }">
			{{ console.log(subcities) }}
			<Table
				:pending="pending"
				:headers="{
					head: ['Sub City Name', 'actions'],
					row: ['subCityName']
				}"
				:rows="subcities"
				:rowCom="SubCityRows"
			/>
		</SubCitiesDataProvider>
	</DefaultPage>
</template>