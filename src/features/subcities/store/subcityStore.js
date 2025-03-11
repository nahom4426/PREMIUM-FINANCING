import { defineStore } from "pinia";
import { ref } from "vue";

export const useSubcity = defineStore('subcityStore', () => {
	const subcities = ref([])

	function set(data) {
		console.log(data);
		
		subcities.value = data
	}

	function getAll() {
		return subcities.value
	}

	function remove(id) {
		const idx = subcities.value.findIndex(el => el.privilegeUuid == id)
		if(idx > -1) {
			subcities.value.splice(idx, 1)
		}
	}

	function add(privilege) {
		subcities.value.unshift(privilege)
	}

	function update(id, data) {
		const idx = subcities.value.findIndex(el => el.privilegeUuid == id)
		if(idx > -1) {
			subcities.value.splice(idx, 1, data)
		}
	}

	return {
		set,
		add,
		remove,
		update,
		getAll,
		subcities
	}
})