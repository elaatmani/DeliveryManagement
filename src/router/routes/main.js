import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import SettingsView from '@/views/settings/SettingsView'
import IndexView from '@/views/notification/IndexView'
import OperationalDashboard from '@/views/dashboard/partials/admin/OperationalDashboard.vue'

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
              title: 'Dashboard',
              gate: 'all'
            }
          },
          {
            path: '/dashboard/operational',
            name: 'operational',
            component: OperationalDashboard,
            meta: {
              module: 'dashboard',
              title: 'Dashboard Operational',
              gate: 'all'
            }
          },
          {
            path: '/notifications/:tab',
            name: 'notifications',
            component: IndexView,
            meta: {
              module: 'notification',
              title: 'Notifications',
              gate: 'all'
            }
          },
          {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {
              module: 'settings',
              title: 'Settings',
              gate: 'all'
            }
          }
        ]
}