import { createRouter, createWebHistory } from 'vue-router'

// Routes
import product from './routes/product'
import category from './routes/category'
import subcategory from './routes/subcategory'
import sales from './routes/sales'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  product,
  category,
  subcategory,
  sales,

  {
    path: '/',
    name: 'home',
    component: DefaultLayout,
    meta: {
      module: 'dashboard'
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardView,
        meta: {
          module: 'dashboard',
        }
      }
    ]
  },
  {
    name: 'all',
    path: '/:pathMatch(.*)',
    component: DefaultLayout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
