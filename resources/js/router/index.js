import vueRouter from 'vue-router';
import Vue from 'vue';
import store from '../store'

Vue.use(vueRouter);


const router = new vueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty', auth: false},
      component: () => import('../views/login.vue'),
    },
    {
      path: '/',
      name: 'receipts',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/receipts.vue'),
    },
    {
      path: '/pickup_points',
      name: 'pickup_points',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/pick-up_points.vue'),
    },
    {
      path: '/products',
      name: 'products',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/products.vue'),
    },
    {
      path: '/clients',
      name: 'clients',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/clients.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/profile.vue'),
    },
    {
      path: '/product_offers',
      name: 'product_offers',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/product_offers.vue'),
    },
    {
      path: '/employees_registration',
      name: 'employees_registration',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/employees_registration.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {

  switch (to.meta.auth) {
    case true:
      if (store.getters.isAuthenticated) {next()} else {next('/login')}
      break
    case false:
      if (store.getters.isAuthenticated) {next('/')} else {next()}
      break
    default:
      next()
  }

})

export default router
