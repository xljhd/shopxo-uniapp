import Vue from 'vue';
import App from './App';
import api from './api/index.js'

// 全局mixins
import base from './common/js/common/base';
import share from './common/js/common/share';
Vue.mixin(base);
Vue.mixin(share);

Vue.prototype.$api = api

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();