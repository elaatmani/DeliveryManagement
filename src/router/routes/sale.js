// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import SaleListView from '@/views/sale/SaleListView'
// import SaleExpidationView from '@/views/sale/SaleExpidationView'
// import SaleShippedView from '@/views/sale/SaleShippedView'
import AdminSales from '@/views/newsales/AdminSales'
import DispatchedSales from '@/views/newsales/DispatchedSales'
import ShippedSales from '@/views/newsales/ShippedSales'



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
                name: 'sale/newlist',
                path: 'new',
                component: AdminSales,
                meta: {
                    module: 'sale',
                    subModule: 'sale/newlist',
                    title: 'Sales List',
                    gate: 'show_all_sales'
                }
            },
            { 
                name: 'sale/expidation',
                path: 'expidation',
                component: DispatchedSales,
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
                component: ShippedSales,
                meta: {
                    module: 'sale',
                    subModule: 'sale/shipping',
                    title: 'Shipping',
                    gate: 'show_all_expidations'
                }
            },

        ]
    }
