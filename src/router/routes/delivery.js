// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import OrdersListView from '@/views/delivery/OrdersListView'
import DeliveredOrdersListView from '@/views/delivery/DeliveredOrdersListView'


export default 
    {
        name: 'deliveries',
        path: '/deliveries',
        component: DefaultLayout,
        meta: {
            module: 'delivery'
        },

        children: [

            // Product routes
            { 
                name: 'delivery/list',
                path: '',
                component: OrdersListView,
                meta: {
                    module: 'delivery',
                    subModule: 'delivery/list',
                    title: 'Orders List',
                    gate: 'all'
                }
            },

            { 
                name: 'delivery/delivered',
                path: '/delivered',
                component: DeliveredOrdersListView,
                meta: {
                    module: 'delivery',
                    subModule: 'delivery/delivered',
                    title: 'Delivered Orders List',
                    gate: 'all'
                }
            },

        ]
    }
