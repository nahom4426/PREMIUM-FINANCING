import MainLayout from '@/layouts/MainLayout.vue'
import transferRoutes from './transfer.routes'
import paymentRoutes from './payment.routes'
import subcitiesRoutes from './subcities.routes'
import ketenaRoutes from './ketena.routes'
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import membersRoutes from "./members.routes";
import rolesRoutes from "./roles.routes";
import usersRoutes from "./users.routes";
import privilagesRoutes from "./privilages.routes";
import branchesRoutes from "./branches.routes";
import Login from "@/pages/login/Login.vue";
import subcityRoutes from "./subcity.routes";
import Dashboard from '@/features/dashboard/pages/Dashboard.vue'
import { useAuth } from '@/stores/auth'

const routes = [
  {
    path: "",
    name: "Root",
    component: MainLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      ...membersRoutes,
      ...rolesRoutes,
      ...privilagesRoutes, // Removed duplicate
      ...usersRoutes,
      ...branchesRoutes,
      ...subcityRoutes,
      ...transferRoutes,
      ...paymentRoutes,
      ...subcitiesRoutes,
      ...ketenaRoutes
    ],
  },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  const auth = useAuth();

  if (!auth.auth?.accessToken) {
    let detail = localStorage.getItem('userDetail');
    if (detail) {
      detail = JSON.parse(detail);
      auth.setAuth({
        user: detail,
        accessToken: detail?.token,
      });
    }
  }

  if (to.path === '/login' && auth.auth?.accessToken) {
    return {
      path: from.path,
    };
  }

  if (
    !to.meta?.requiresAuth ||
    auth.auth?.user?.privileges?.includes('All Privileges') ||
    auth.auth?.user?.roleName === 'Super Admin'
  ) {
    return true;
  }

  if (!auth.auth?.accessToken) {
    return {
      path: '/login',
      query: {
        redirect: to.path,
      },
    };
  }

  if (
    (auth.auth?.user?.roleName &&
      to.meta?.role &&
      auth.auth?.user?.roleName === to.meta?.role) ||
    (!to.meta?.role && !to.meta?.privileges && to.meta?.requiresAuth)
  ) {
    return true;
  }

  let privileges = auth.auth.user?.privileges;
  const found = (to.meta?.privileges || []).find((privilege) => {
    return privileges?.includes(`ROLE_${privilege}`);
  });

  if (found) return true;

  return {
    path: '/forbidden',
  };
});

export default router;
