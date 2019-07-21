import Vue from 'vue';

import isPermissionAllowed from "./plugins/isPermissionAllowed";
import router from './router/index';
import store from './store/index';
import http from "./plugins/http";
import './registerServiceWorker';
import config from "./config";
import App from './App.vue';

Vue.prototype.isPermissionAllowed = isPermissionAllowed;
Vue.config.productionTip = false;
Vue.prototype.$http = http.http;
Vue.prototype.$httpGraphql = http.httpGraphql;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
