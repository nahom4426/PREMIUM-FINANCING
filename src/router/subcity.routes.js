import AddSubCity from "@/features/subcities/pages/AddSubCity.vue";
import SubCity from "@/features/subcities/pages/SubCity.vue";

export default [
	{
		path: '/sub_cities',
		name: 'Sub Cities',
		component: SubCity
	},
	{
		path: '/add_sub_city',
		name: 'Sub City',
		component: AddSubCity
	}
]