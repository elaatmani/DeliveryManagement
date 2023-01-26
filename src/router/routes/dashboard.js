import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'


export default {

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
}