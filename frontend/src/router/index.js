import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import LoginPage from '@/components/LoginPage.vue';
import Cookies from 'js-cookie';
import HomePage from '@/components/HomePage.vue';

function isAuthenticated() {
  return !!Cookies.get('accessToken'); 
}

const routes = [
  { path: '/login', component: LoginPage },
  { 
    path: '/', 
    component: App,
    children: [
      { 
        path: '',
        component: HomePage,
        meta: { requiresAuth: true },
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;