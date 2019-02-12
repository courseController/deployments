
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import _ from 'lodash'
Vue.set(Vue.prototype, '_', _);
import App from './App.vue'
import NProgress from 'vue-nprogress'
import BootstrapVue from 'bootstrap-vue'
import VueMq from 'vue-mq'

import './components/_autoload'

import store from './store'
import server from './server'
import router from './router'

CourseController = server;

Vue.use(VueMq, {
    /* up to N px*/
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 993,
        lg: 1200,
        xl: Infinity,
    }
})
Vue.use(BootstrapVue, {parent: ".nprogress-container"});
Vue.use(NProgress, {
    //latencyThreshold: 200, // Number of ms before progressbar starts showing, default: 100,
    //router: false, // Show progressbar when navigating routes, default: true
    //http: false // Show progressbar when doing Vue.http, default: true
});
const nprogress = new NProgress()

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* @see index.html about VueApp global */
VueApp = new Vue({
    render: h => h(App),
    nprogress,
    router,
    store,
}).$mount('#app')
