import Subcities from "@/features/subcities/pages/subcities.vue";


export default [

	{
		path: '/subcities',
		name: 'Subcities',
		component: Subcities,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	}
]