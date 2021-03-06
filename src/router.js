import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/register',
      component: () => import('@/views/login/register')
    },
    {
      path: '/completeInfo/:id',
      component: () => import('@/views/login/completeInfo')
    },
    // {
    //   path: '/layout',
    //   component: resolve => require(['@/views/layout/layout.vue'], resolve)
    // },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/ebook',
      component: resolve => require(['@/views/ebook/index.vue'], resolve),
      children: [{
        path: ':fileName',
        component: resolve => require(['@/components/ebook/EbookReader.vue'], resolve)
      }]
    },
    {
      path: '/book-store',
      component: resolve => require(['@/views/layout/layout.vue'], resolve),
      redirect: '/book-store/shelf',
      children: [
        {
          path: '/book-store/shelf',
          component: resolve => require(['@/views/store/bookShelf.vue'], resolve),
          meta: { key: 1 }
        },
        {
          path: '/book-store/category',
          component: resolve => require(['@/views/store/bookCategory.vue'], resolve),
          meta: { key: 2 }
        },
        {
          path: '/book-store/home',
          component: resolve => require(['@/views/store/bookHome.vue'], resolve),
          meta: { key: 3 }
        },
        {
          path: '/book-store/list',
          component: resolve => require(['@/views/store/bookList.vue'], resolve),
          meta: { key: 4 }
        },
        {
          path: '/book-store/detail',
          component: resolve => require(['@/views/store/bookDetail.vue'], resolve),
          meta: { key: 5 }
        },
        {
          path: '/book-store/book-speaking',
          component: resolve => require(['@/views/store/bookSpeaking.vue'], resolve),
          meta: { key: 6 }
        },
        {
          path: '/mine',
          component: resolve => require(['@/views/mine/mineView.vue'], resolve),
          meta: { key: 6 }
        }
      ]
    }
  ]
})
