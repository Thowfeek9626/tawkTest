import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Category from './views/Category.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/categories/:id',
    component: Category,
    prop: true
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes:routes
});

export default router;
