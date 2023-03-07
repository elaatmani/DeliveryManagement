// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import OrderListView from '@/views/order/OrderListView'


export default 
    {
        name: 'orders',
        path: '/orders',
        component: DefaultLayout,
        meta: {
            module: 'order'
        },

        children: [

            // Product routes
            { 
                name: 'order/list',
                path: '',
                component: OrderListView,
                meta: {
                    module: 'order',
                    subModule: 'order/list',
                    title: 'Orders List',
                    gate: 'all'
                }
            },

        ]
    }
