import Vue from 'vue';
import router from '@src/router.ts';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router: router
  });
});