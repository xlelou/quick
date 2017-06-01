import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import homepage from 'components/homepage'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    }
  ]
})
