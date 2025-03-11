import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberForm = defineStore('memberForm', () => {
	const form = ref({
		member: {},
		dependants: [],
		payment: {}
	})

	const selectedDependant = ref({})

	function selecteActiveDependant(id) {
		console.log(id);
	
		selectedDependant.value = form.value.dependants.find(el => el.id == id)
	}

	function addDependant(data) {
		const idx = form.value.dependants.findIndex(el => el.id == data.id)
		if(idx > -1) {
			form.value.dependants.splice(idx, 1, data)
		} else {
			form.value.dependants.push(data)
		}
		selectedDependant.value = {}
	}

	return {
		selectedDependant,
		addDependant,
		form,
		selecteActiveDependant
	}
})