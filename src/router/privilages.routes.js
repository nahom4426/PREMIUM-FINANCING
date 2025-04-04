import AddPrivilege from "@/features/privilages/pages/AddPrivilege.vue";
import Pivilages from "@/features/privilages/pages/Privileges.vue";
import UpdatePrivilege from "@/features/privilages/pages/EditPrivilege.vue";
import PremiumDetails from "@/features/financing/premium/pages/premiumDetails.vue";
export default [
	{
		path: '/privileges',
		name: 'Privileges',
		component: Pivilages,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/add_privilege',
		name: 'Add Privileges',
		component: AddPrivilege,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/edit_privilege/:privilegeUuid',
		name: 'Update Privileges',
		component: UpdatePrivilege,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
					path: '/premiumDetails/:premiumUuid',
					name: 'PremiumDetails',
					component: PremiumDetails,
					meta: {
				  requiresAuth: true,
				  permissions: []
				}
				},
]