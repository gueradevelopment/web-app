import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import dotenv from 'dotenv';
import VueCookies from 'vue-cookies-ts';

dotenv.config();

Vue.use(VueCookies);
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
