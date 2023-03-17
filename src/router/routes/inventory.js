// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import InventoryStateListView from '@/views/inventory/InventoryStateListView'


export default 
    {
        name: 'inventory/list',
        path: '/inventories',
        component: DefaultLayout,
        meta: {
            module: 'inventory'
        },

        children: [

            // Product routes
            { 
                name: 'inventory/state',
                path: '',
                component: InventoryStateListView,
                meta: {
                    module: 'inventory',
                    subModule: 'inventory/list',
                    title: 'Inventory List',
                    gate: 'show_all_inventory_states'
                }
            },

        ]
    }
