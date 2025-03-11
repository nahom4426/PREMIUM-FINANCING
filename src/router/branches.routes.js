import AddBranch from "@/features/branches/pages/AddBranch.vue";
import Branches from "@/features/branches/pages/branches.vue";

export default [
	{
		path: '/branches',
		name: 'branches',
		component: Branches,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/add_branch',
		name: 'Add Branch',
		component: AddBranch,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	}
]