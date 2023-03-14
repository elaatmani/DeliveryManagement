// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import OrdersListView from '@/views/delivery/OrdersListView'


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

        ]
    }
