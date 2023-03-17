import { createRouter, createWebHistory } from 'vue-router'
import beforeEach from './beforeEach'

// Routes
import auth from './routes/auth'
import dashboard from './routes/dashboard'
import product from './routes/product'
import category from './routes/category'
import subcategory from './routes/subcategory'
import user from './routes/user'
import sale from './routes/sale'
import order from './routes/order'
import delivery from './routes/delivery'
import inventory from './routes/inventory'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import NotFound from '@/views/NotFound'
import TestView from '@/views/TestView'

const routes = [
  auth,
  dashboard,
  product,
  category,
  subcategory,
  user,
  sale,
  order,
  delivery,
  inventory,

  {
    name: 'default',
    path: '/test',
    component: DefaultLayout,
    children: [
      {
        name: 'test',
        path: '',
        component: TestView,
        meta: {
          title: 'Test abro m3a rasek',
          module: 'test',
          gate: 'all'
        }
      },
    ]
  },

  {
    name: 'not-found',
    path: '/404',
    component: DefaultLayout,
    meta: {
      title: 'Not Found',
    },
    children: [
      {
        name: '404',
        path: '',
        component: NotFound
      }
    ]
  },
  {
    name: 'catch-all',
    path: '/:pathMatch(.*)',
    beforeEnter: (to, from, next) => {
      return next({ name: '404' })
    },
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(beforeEach);

export default router
