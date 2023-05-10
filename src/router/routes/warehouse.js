// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import WarehouseListView from '@/views/warehouse/WarehouseListView'



export default 
    {
        name: 'warehouses',
        path: '/warehouses',
        component: DefaultLayout,
        meta: {
            module: 'warehouse'
        },

        children: [

            // Warehouses routes
            { 
                name: 'warehouse/list',
                path: '',
                component: WarehouseListView,
                meta: {
                    module: 'warehouse',
                    subModule: 'warehouse/list',
                    title: 'Warehouse List',
                    gate: 'show_all_warehouses'
                }
            },
        ]
    }
