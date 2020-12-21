import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

import '../assets/app.scss'
import routes from 'src/routes'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({
	routes
})

export default new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app')
