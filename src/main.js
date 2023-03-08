import Vue from 'vue';
import App from './app.vue';
import router from './router';
import ViewUI from 'view-design';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-plus/dist/index.css';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.config.productionTip = false;

import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)

import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.use(axios)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
