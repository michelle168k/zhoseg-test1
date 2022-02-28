import Vue from 'vue';
import VueRouter from 'vue-router';
import Browse from '@/views/Browse';
import Analysis from '../views/Analysis.vue';
import Upload from '../views/Upload';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/browse',
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
  },
  {
    path: '/analysis/:file',
    name: 'analysis',
    component: Analysis,
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
