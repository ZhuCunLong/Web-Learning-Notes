import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/css3',
      name: 'css3',
      component: () => import('@/views/css3-learning/ui')
    }
  ]
})
