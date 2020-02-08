import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  store,
}).$mount('#app');
