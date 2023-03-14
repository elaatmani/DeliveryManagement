// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import OrderListView from '@/views/order/OrderListView'
import OrderView from '@/views/order/OrderView'
import ConfirmedOrderListView from '@/views/order/ConfirmedOrderListView'


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
                    gate: 'show_all_orders'
                }
            },

            { 
                name: 'order/show',
                path: '/order',
                component: OrderView,
                meta: {
                    module: 'order',
                    subModule: 'order/show',
                    title: 'Current Order',
                    gate: 'show_all_orders'
                }
            },

            { 
                name: 'order/confirmed',
                path: '/orders/confirmed',
                component: ConfirmedOrderListView,
                meta: {
                    module: 'order',
                    subModule: 'order/confirmed',
                    title: 'Confirmed Orders',
                    gate: 'show_all_orders'
                }
            },

        ]
    }
