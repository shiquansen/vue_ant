import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserSummary from '@/view/demo/UserSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserSummary',
      component: UserSummary
    },
    {
      path: '/12',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
