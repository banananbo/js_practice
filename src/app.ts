import Vue from 'vue';
import router from '@src/router.ts';
import store from '@src/store/index.ts';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router: router,
    store: store
  });
});