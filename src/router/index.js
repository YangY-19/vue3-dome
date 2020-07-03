import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User/index.vue'),
  },
  {
    path: '/information',
    name: 'Information',
    component: () => import('../views/Information/index.vue'),
  },
  {
    path: '/discover',
    name: 'Discover',
    component: () => import('../views/Discover/index.vue'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
   if(to.path === '/') {
     next({ path: '/home' })
   } else {
      next()
   }
})

export default router;
