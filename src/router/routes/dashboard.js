// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

import DashboardView from '@/views/newdashboards/admin/DashboardView'
import AgentDashboard from '@/views/newdashboards/agent/AgentDashboard'
import MarketerDashboardView from '@/views/newdashboards/marketer/DashboardView'
import DashboardAnalytics from '@/views/dashboardanalytics/DashboardAnalytics'
import DashboardChartsView from '@/views/newdashboards/admin/charts/DashboardChartsView'
import DashboardFinanceView from '@/views/dashboardfinance/DashboardFinanceView.vue'
import DashboardProductView from '@/views/dashboardproduct/DashboardProductView'

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
                name: 'dashboards/analytics',
                path: '/analytics',
                component: DashboardAnalytics,
                meta: {
                    module: 'dashboards',
                    subModule: 'dashboards/analytics',
                    title: 'Dashboard Analytics',
                    gate: 'show_all_ads'
                }
            },
            { 
                name: 'dashboards/finance',
                path: '/finance',
                component: DashboardFinanceView,
                meta: {
                    module: 'dashboards',
                    subModule: 'dashboards/finance',
                    title: 'Dashboard Finance',
                    gate: 'show_all_ads'
                }
            },
            { 
                name: 'dashboards/product',
                path: '/product',
                component: DashboardProductView,
                meta: {
                    module: 'dashboards',
                    subModule: 'dashboards/product',
                    title: 'Dashboard Product',
                    gate: 'show_all_ads'
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
            { 
                name: 'dashboards/marketer',
                path: 'marketer',
                component: MarketerDashboardView,
                meta: {
                    module: 'dashboards',
                    subModule: 'dashboards/marketer',
                    title: 'Dashboard',
                    gate: 'all'
                }
            },
            { 
                name: 'dashboards/admin/charts',
                path: 'admin/charts',
                component: DashboardChartsView,
                meta: {
                    module: 'dashboards',
                    subModule: 'admin/charts',
                    title: 'Charts',
                    role: 'admin'
                }
            },

        ]
    }
