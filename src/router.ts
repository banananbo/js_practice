import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@pages/Home.vue';
import Hello from '@pages/Hello.vue';

let routes = [
    { name:"home"  ,path: '/', component: Home },
    { name:"hello" ,path: '/hello', component: Hello },
];

Vue.use(VueRouter);
export default  new VueRouter({
  routes
});