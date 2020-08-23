import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Hotel from '../views/Hotel.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hostel/:id',
    name: 'Hotel',
    component: Hotel,
  },
  {
    path: '*',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
