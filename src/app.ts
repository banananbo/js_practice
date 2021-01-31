import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@src/router.ts';

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

document.addEventListener('DOMContentLoaded', () => {
  // new Vue(Hello).$mount('#app');
  new Vue({
    el: '#app',
    router: router
  });
});