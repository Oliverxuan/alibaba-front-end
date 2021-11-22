// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import {
	myRequest,
	BASE_URL
} from 'util/api.js'
import 'util/router.js'
Vue.use(uView);
Vue.config.productionTip = false


App.mpType = 'app'

Vue.prototype.$myRequest = myRequest

Vue.prototype.$BASE_URL = BASE_URL

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif