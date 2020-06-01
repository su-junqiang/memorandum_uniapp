import Vue from 'vue'
import App from './App'
// import MuseUI from '@/components/muse-ui';
// // import '@/components/muse-ui/dist/muse-ui.css';
// 
// Vue.use(MuseUI);

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
