import { createRouter, createWebHistory } from 'vue-router'
import beforeEach from './beforeEach'

// Routes
import auth from './routes/auth'
import main from './routes/main'
import product from './routes/product'
import user from './routes/user'
import sale from './routes/sale'
import order from './routes/order'
import delivery from './routes/delivery'
import inventory from './routes/inventory'
import shop from './routes/shop'
import warehouse from './routes/warehouse'
import factorisation from './routes/factorisation'
import sheet from './routes/sheet'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import NotFound from '@/views/NotFound'
import TestView from '@/views/TestView'

const routes = [
  auth,
  main,
  product,
  user,
  sale,
  order,
  delivery,
  inventory,
  shop,
  warehouse,
  factorisation,
  sheet,
  
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
      }
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
    meta: {
      title: 'Not Found'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(beforeEach);

export default router
