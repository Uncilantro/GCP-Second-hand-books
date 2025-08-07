import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './api/store'; // 引入 Vuex 存储
import './api/dataProcessing'; // 引入数据处理脚本

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App,
    store
});

app.$mount();
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
    createSSRApp
} from 'vue'
export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
// #endif