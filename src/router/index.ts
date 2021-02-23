import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Header from '../components/Layouts/Header.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    components: {
      header: Header,
      default: Home,
    },
  },
  {
    path: '/about',
    name: 'About',
    components: {
      header: Header,
      default: About,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
