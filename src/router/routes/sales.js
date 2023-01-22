// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import SalesListView from '@/views/sales/SalesListView'


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
                    subModule: 'sales/list'
                }
            },

            { 
                name: 'sales/new',
                path: '/sales/new',
                component: SalesListView,
                meta: {
                    module: 'sales',
                    subModule: 'sales/new'
                }
            },

        ]
    }
