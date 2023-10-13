import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../store/authStore';

import Home from '../views/HomePage.vue';
import Map from '../views/MapPage.vue';
import Boost from '../views/BoostPage.vue';
import Login from '../views/LoginPage.vue';
import SignUp from '../views/SignUpPage.vue';

// protected routes (routes that require auth by adding the 'requiresAuth' metadata)
const protectedRoutes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Map', name: 'Map', component: Map },
  { path: '/Boost', name: 'Boost', component: Boost },
].map(route => ({ ...route, meta: { requiresAuth: true } }));

// public routes (accessible without auth)
const publicRoutes: Array<RouteRecordRaw> = [
  { path: '/Login', name: 'Login', component: Login },
  { path: '/SignUp', name: 'SignUp', component: SignUp },
];

// Combine all routes
const routes: Array<RouteRecordRaw> = [
  ...protectedRoutes,
  ...publicRoutes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

// Create navigation guard to check auth status before navigating
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  // If route requires auth and the user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/Login'); // redirect to login
  } else {
    next(); // allow nav to route
  }
});

export default router;
