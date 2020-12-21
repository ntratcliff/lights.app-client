import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import '../assets/app.scss'

Vue.use(BootstrapVue)

export default new Vue({
	el: '#app',
	render: h => h(App)
})
