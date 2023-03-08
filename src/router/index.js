import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '@/pages/login.vue';
import register from '@/pages/register.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/index',
    name: 'index',
    redirect : "/list",
    component: () => import("@/pages/index.vue"),
    children : [
      {
        path: '/list',
        name: 'list',
        component: () => import("@/pages/list.vue"),
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
