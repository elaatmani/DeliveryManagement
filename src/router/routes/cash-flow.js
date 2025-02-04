// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

import CashFlowDashboardView from '@/views/cashflow/dashboard/CashFlowDashboardView.vue'
import CashFlowListView from '@/views/cashflow/list/CashFlowListView.vue'

export default 
    {
        name: 'cashflow',
        path: '/cashflow',
        component: DefaultLayout,
        meta: {
            module: 'cashflow'
        },

        children: [
                { 
                    name: 'cashflow/dashboard',
                    path: '',
                    component: CashFlowDashboardView,
                    meta: {
                        module: 'cashflow',
                        subModule: 'cashflow/dashboard',
                        title: 'Cashflow',
                        role: 'admin'
                    }
                },
                { 
                    name: 'cashflow/list',
                    path: 'list',
                    component: CashFlowListView,
                    meta: {
                        module: 'cashflow',
                        subModule: 'cashflow/list',
                        title: 'Cashflow',
                        role: 'admin'
                    }
                }

        ]
    }
