// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import InventoryStateListView from '@/views/inventory/InventoryStateListView'
import AddInventoryMovementView from '@/views/inventory/AddInventoryMovementView'
import UpdateInventoryMovementView from '@/views/inventory/UpdateInventoryMovementView'
import InventoryMovementsListView from '@/views/inventory/InventoryMovementsListView'




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
                    title: 'Inventory State',
                    gate: 'show_all_inventory_states'
                }
            },

            { 
                name: 'inventory/movememnts',
                path: 'movements',
                component: InventoryMovementsListView,
                meta: {
                    module: 'inventory',
                    subModule: 'inventory/movements',
                    title: 'Inventory Movements',
                    gate: 'show_all_inventory_movements'
                }
            },

            { 
                name: 'inventory/add',
                path: 'add',
                component: AddInventoryMovementView,
                meta: {
                    module: 'inventory',
                    subModule: 'inventory/add',
                    title: 'Add Inventory Movement',
                    gate: 'create_inventory_movement'
                }
            },

            { 
                name: 'inventory/update',
                path: 'update/:id',
                component: UpdateInventoryMovementView,
                meta: {
                    module: 'inventory',
                    subModule: 'inventory/update',
                    title: 'Update Inventory Movement',
                    gate: 'update_inventory_movement'
                }
            },

        ]
    }
