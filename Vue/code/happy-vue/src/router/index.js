import Vue from 'vue'
import VueRouter from 'vue-router'

/* Layout */
import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/hello-world',
    children: [
      {
        path: 'hello-world',
        component: () => import('@/views/hello-world/index'),
        name: 'HelloWorld',
        meta: {
          title: '学海无涯',
          icon: 'el-icon-menu'
        }
      }
    ]
  },
  {
    path: '/learn',
    component: Layout,
    redirect: '/learn/directive',
    children: [{
      path: 'directive',
      component: () => import('@/views/directive/index'),
      name: 'directive',
      meta: {
        title: 'vue指令',
        icon: 'el-icon-menu'
      }
    }]
  },
  {
    path: '/learn1',
    component: Layout,
    redirect: '/learn1/static-class',
    children: [{
      path: 'static-class',
      component: () => import('@/views/staticClass'),
      name: 'staticClass',
      meta: {
        title: 'Class静态方法',
        icon: 'el-icon-menu'
      }
    }]
  }
]

export const asyncRoutes = []

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
