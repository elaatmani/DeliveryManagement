// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import SaleListView from '@/views/sale/SaleListView'
import SaleExpidationView from '@/views/sale/SaleExpidationView'
import SaleShippingView from '@/views/sale/SaleShippingView'


export default 
    {
        name: 'sales',
        path: '/sales',
        component: DefaultLayout,
        meta: {
            module: 'sale'
        },

        children: [

            // Product routes
            { 
                name: 'sale/list',
                path: '',
                component: SaleListView,
                meta: {
                    module: 'sale',
                    subModule: 'sale/list',
                    title: 'Sales List',
                    gate: 'show_all_sales'
                }
            },
            { 
                name: 'sale/expidation',
                path: 'expidation',
                component: SaleExpidationView,
                meta: {
                    module: 'sale',
                    subModule: 'sale/expidation',
                    title: 'Expidation',
                    gate: 'show_all_expidations'
                }
            },
            { 
                name: 'sale/shipping',
                path: 'shipping',
                component: SaleShippingView,
                meta: {
                    module: 'sale',
                    subModule: 'sale/shipping',
                    title: 'Expidation',
                    gate: 'show_all_expidations'
                }
            }
        

        ]
    }
