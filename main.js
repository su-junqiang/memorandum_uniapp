import Vue from 'vue'
import App from './App'
// import MuseUI from '@/components/muse-ui';
// // import '@/components/muse-ui/dist/muse-ui.css';
// 
// Vue.use(MuseUI);
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	Vue.component('mescroll-body', MescrollBody)
	Vue.component('mescroll-uni', MescrollUni)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
