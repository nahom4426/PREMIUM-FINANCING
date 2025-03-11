import Users from "@/features/users/pages/Users.vue";
import AddUser from "@/features/users/pages/AddUser.mdl.vue";
import EditUser from "@/features/users/pages/EditUser.vue";

export default [
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      permissions: [],
    },
  },
  {
    path: "/edit_user/:userUuid",
    name: "edit user",
    component: EditUser,
     meta: {
        requiresAuth: true,
        permissions: [],
      }
  },
  {
    path: "/usersForm",
    name: "User Form",
    component: AddUser,
    meta: {
      requiresAuth: true,
      permissions: [],
    },
  },
];
