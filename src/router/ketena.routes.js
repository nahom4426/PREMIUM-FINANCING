import Ketena from "@/features/ketena/pages/ketena.vue";

export default [
	{
		path: '/ketena',
		name: 'Ketena',
		component: Ketena,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	}
]