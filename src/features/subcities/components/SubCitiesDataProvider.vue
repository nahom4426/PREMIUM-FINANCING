<script setup>
import { usePagination } from "@/composables/usePagination";
import { getAllSubCities } from "../api/subcityApi";
import { useSubcity } from "../store/subcityStore";

const subcityStore = useSubcity();

const pagination = usePagination({
	store: subcityStore,
  auto: false,
  cb: getAllSubCities,
});

if(!subcityStore.subcities.length) {
	pagination.send()
}

</script>
<template>
  <slot
		:subcities="subcityStore.subcities"
		:pending="pagination.pending.value"
		:error="pagination.error.value"
	/>
</template>
