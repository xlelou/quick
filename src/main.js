// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import hello from './components/Hello.vue'
import homepage from './components/homepage.vue'
import inCity from './components/inCity/inCity.vue'
import detail from './components/inCity/detail.vue'
import send from './components/send/send.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(MuseUI)
Vue.use(MintUI)

const router = new VueRouter({
  hashbang: false,
  history: false,
  routes: [
    { path: '/hello', component: hello },
    { path: '/send', component: send },
    { path: '/homepage', component: homepage },
    { path: '/inCity', component: inCity },
    { path: '/inCity/detail/:id', component: detail },
    { path: '/outCity', component: inCity },
    { path: '/outCity/detail/', component: detail },
    { path: '/', redirect: '/homepage' }
  ]
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#app',
  template: '<APP/>',
  components: {App},
  router: router,
  render: h => h('App')
})
