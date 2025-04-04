<script setup>
 import DefaultPage from '@/components/DefaultPage.vue'
 import Table from '@/components/Table.vue'
 import Button from '@/components/Button.vue'
  import icons from "@/utils/icons";
</script>
<template>
	<DefaultPage placeholder="Search For a Member">
		<template #more>
			<div class="flex gap-2 justify-end items-center">
				<!-- <Button type="primary" class="flex items-center gap-2">
					<i v-html="icons.plus" />
					Add New Member
				</Button> -->
				<!--<Button class="border border-priamry text-primary flex items-center gap-2">
					<i v-html="icons.import" />
					Import Members
				</Button>-->
			</div>
		</template>
   <Table
	   :headers="{
		    head: ['Fullname', 'Date Of Birth', 'Address', 'Phone', 'Email', 'Gender', 'actions']
		 }"
	 />
	</DefaultPage>
</template>