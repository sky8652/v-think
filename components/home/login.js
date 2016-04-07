import Vue from 'vue';
import home from './layout/login.vue';
import vueResource from 'vue-resource';

Vue.use(vueResource);
new Vue(home);