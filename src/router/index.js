import { createRouter, createWebHistory } from 'vue-router'

// Routes
import auth from './routes/auth'
import dashboard from './routes/dashboard'
import product from './routes/product'
import category from './routes/category'
import subcategory from './routes/subcategory'
import sales from './routes/sales'

import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

const routes = [
  auth,
  dashboard,
  product,
  category,
  subcategory,
  sales,

  
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
