import { createRouter, createWebHistory } from 'vue-router'
import beforeEach from './beforeEach'

// Routes
import auth from './routes/auth'
import dashboard from './routes/dashboard'
import product from './routes/product'
import category from './routes/category'
import subcategory from './routes/subcategory'
import sales from './routes/sales'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import NotFound from '@/views/NotFound'

const routes = [
  auth,
  dashboard,
  product,
  category,
  subcategory,
  sales,

  {
    name: 'not-found',
    path: '/404',
    component: DefaultLayout,
    meta: {
      title: 'Not Found',
      gate: ''
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
