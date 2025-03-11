import AddRole from "@/features/roles/pages/AddRole.vue";
import Roles from "@/features/roles/pages/Role.vue";
import UpdateRole from "@/features/roles/pages/EditRole.vue";

export default [
	{
		path: '/roles',
		name: 'Roles',
		component: Roles,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/add_role',
		name: 'Add Role',
		component: AddRole,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/edit_role/:roleUuid',
		name: 'Update Role',
		component: UpdateRole,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	}
]