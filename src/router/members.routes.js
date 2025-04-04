import AddMember from "@/features/members/pages/AddMember.vue";
import Importedmembers from "@/features/members/pages/Importedmembers.vue";
import MemberFormProgress from "@/features/members/pages/MemberFormProgress.vue";
import Members from "@/features/members/pages/Members.vue";
import Details from "@/features/quatation/pages/details.vue";
import DespersementDetails from "@/features/financing/dispersement/pages/dispersementDetails.vue";
export default [
	{
		path: '/clients',
		name: 'members',
		component: Members,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/add_member',
		name: 'Add Member',
		component: MemberFormProgress,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
		path: '/imported_members/:woredaUuid',
		name: 'Imported Members',
		component: Importedmembers,
		meta: {
      requiresAuth: true,
      permissions: []
    }
	},
	{
					path: '/despersementDetails/:despersementUuid',
					name: 'Details',
					component: DespersementDetails,
					meta: {
				  requiresAuth: true,
				  permissions: []
				}
				}
]