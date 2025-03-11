import icons from "@/utils/icons";

export default [
  {
    path: "/dashboard",
    icon: icons.dashboard,
    name: "Dashboard",
    meta: {
      requiresAuth: true,
      permissions: [],
    },
    type: "",
  },
  {
    path: '/clients',
    icon: icons.renew,
    name: 'Clients',
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/transfer',
    icon: icons.transfer,
    name: 'Inspections',
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/add_member',
    icon: icons.add_member,
    name: 'Add Member',
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
 
 
  {
    path: '/payment',
    icon: icons.payment,
    name: 'payment',
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/sub_cities',
    icon: icons.city,
    name: 'Sub Cities',
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/add_sub_city',
    icon: icons.city,
    name: 'Add Sub City',
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/privileges',
    name: 'Privileges',
    icon: icons.privilege,
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    icon: icons.role,
    meta: {
      requiresAuth: true,
      permissions: []
    }
  },
  {
    path: '/Users',
    name: 'Users',
    icon: icons.users,
    meta: {
      requiresAuth: true,
      permissions: []
    }
  }
];
