// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import AgentOrders from '@/views/newagent/AgentOrders'
import AgentAddOrder from '@/views/newagent/AgentAddOrder'
import AgentConfirmedOrders from '@/views/newagent/AgentConfirmedOrders'


export default 
    {
        name: 'orders',
        path: '/agent/orders',
        component: DefaultLayout,
        meta: {
            module: 'order'
        },

        children: [

            // Product routes
            { 
                name: 'order/list',
                path: '',
                component: AgentOrders,
                meta: {
                    module: 'order',
                    subModule: 'order/list',
                    title: 'Orders List',
                    gate: 'show_all_orders'
                }
            },

            { 
                name: 'order/show',
                path: 'add',
                component: AgentAddOrder,
                meta: {
                    module: 'order',
                    subModule: 'order/show',
                    title: 'Current Order',
                    gate: 'show_all_orders'
                }
            },

            { 
                name: 'order/confirmed',
                path: 'confirmed',
                component: AgentConfirmedOrders,
                meta: {
                    module: 'order',
                    subModule: 'order/confirmed',
                    title: 'Confirmed Orders',
                    gate: 'show_all_orders'
                }
            },

        ]
    }
