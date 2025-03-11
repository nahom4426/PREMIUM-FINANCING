import Transfer from "@/features/transfer/pages/transfer.vue";
import Branches from "@/features/branches/pages/branches.vue";

export default [

	{
		path: '/transfer',
		name: 'Transfer',
		component: Transfer,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	}
]