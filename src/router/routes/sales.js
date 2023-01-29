// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import SalesListView from '@/views/sales/SalesListView'
import AddSaleView from '@/views/sales/AddSaleView'


export default 
    {
        name: 'sales',
        path: '/sales',
        component: DefaultLayout,
        meta: {
            module: 'sales'
        },

        children: [

            // Sales routes
            { 
                name: 'sales/list',
                path: '',
                component: SalesListView,
                meta: {
                    module: 'sales',
                    subModule: 'sales/list',
                    title: 'Sales List',
                    gate: 'sale_show'
                }
            },

            { 
                name: 'sales/new',
                path: '/sales/new',
                component: AddSaleView,
                meta: {
                    module: 'sales',
                    subModule: 'sales/new',
                    title: 'Add Sale',
                    gate: 'sale_create'
                }
            },

        ]
    }
