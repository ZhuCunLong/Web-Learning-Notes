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
  },
  {
    path: '/learn2',
    component: Layout,
    redirect: 'noRedirect',
    name: 'playWatch',
    meta: {
      title: '双绑/watch',
      icon: 'el-icon-menu'
    },
    children: [{
      path: 'play-watch',
      component: () => import('@/views/play-watch'),
      name: 'playWatch0',
      meta: {
        title: '对象绑定',
        icon: 'el-icon-menu'
      }
    }, {
      path: 'play-watch1',
      component: () => import('@/views/play-watch/test1'),
      name: 'playWatch1',
      meta: {
        title: '数组绑定',
        icon: 'el-icon-menu'
      }
    }]
  },
  {
    path: '/learn3',
    component: Layout,
    redirect: 'noRedirect',
    name: 'playAsync',
    meta: {
      title: '异步事件',
      icon: 'el-icon-menu'
    },
    children: [{
      path: 'play-async1',
      component: () => import('@/views/play-async'),
      name: 'playAsync1',
      meta: {
        title: '异常处理',
        icon: 'el-icon-menu'
      }
    }]
  },
  {
    path: '/learn4',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ImgUtils',
    meta: {
      title: '图片操作',
      icon: 'el-icon-menu'
    },
    children: [{
      path: 'img-utils1',
      component: () => import('@/views/img-utils'),
      name: 'ImgUtils1',
      meta: {
        title: '图片截取',
        icon: 'el-icon-menu'
      }
    }, {
      path: 'img-utils2',
      component: () => import('@/views/img-utils/img-fit'),
      name: 'ImgUtils2',
      meta: {
        title: '图片自适应',
        icon: 'el-icon-menu'
      }
    }]
  },
  {
    path: '/learn5',
    component: Layout,
    redirect: 'noRedirect',
    name: 'PlayCanvas',
    meta: {
      title: 'canvas相关',
      icon: 'el-icon-menu'
    },
    children: [{
      path: 'play-canvas',
      component: () => import('@/views/play-canvas'),
      name: 'PlayCanvas',
      meta: {
        title: '画板',
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
