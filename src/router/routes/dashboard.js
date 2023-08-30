// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

import DashboardView from '@/views/newdashboards/admin/DashboardView'
import AgentDashboard from '@/views/newdashboards/agent/AgentDashboard'

export default 
    {
        name: 'dashboards',
        path: '/dashboards',
        component: DefaultLayout,
        meta: {
            module: 'dashboards',
            gate: 'all'
        },

        children: [

            // Product routes
            { 
                name: 'dashboards/admin',
                path: 'admin',
                component: DashboardView,
                meta: {
                    module: 'dashboards',
                    subModule: 'dashboards/admin',
                    title: 'Dashboard',
                    gate: 'all'
                }
            },
            { 
                name: 'dashboards/agent',
                path: 'agent',
                component: AgentDashboard,
                meta: {
                    module: 'dashboards',
                    subModule: 'dashboards/agent',
                    title: 'Dashboard',
                    gate: 'all'
                }
            },

        ]
    }
