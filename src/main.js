import Vue from 'vue';

import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import myPlugins from './plugins/index.js';
import './assets/main.css';

Vue.use(myPlugins);

Vue.config.devtools = true;

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
