// ---------------------------------------------------------------------------
// link structure
//   - id
//   - title
//   - hasChildren: has any sub links ? true/false
//   - module: should be same as meta.module in router
//   - icon: 
//     - type: icon/svg
//     - value: mdi icon name or svg path **it should be in public folder** 
// 
// Sublink structure
//   - id
//   - subModule: same as in meta.subModule in router children 
//   - title
//   - to
// 
// 
// ---------------------------------------------------------------------------

export const links = [

    {
        id: 1,
        title: 'Dashboard',
        module: 'dashboard',
        to: '/',
        hasChildren: false,
        gate: 'all',
        icon: {
            type: 'svg',
            value: 'assets/img/icons/dashboard.svg'
        }
    },

    {
        id: 2,
        module: 'product',
        title: 'Product',
        hasChildren: true,
        gate: 'access_to_products', 
        icon: {
            type: 'svg',
            value: 'assets/img/icons/product.svg'
        },
        children: [
            {
                id: 1,
                title: 'Products List',
                subModule: 'product/list',
                gate: 'show_all_products',
                to: '/products'
            },
            {
                id: 2,
                title: 'Add Product',
                subModule: 'product/add',
                gate: 'create_product',
                to: '/products/add'
            },
        ]
    },

    {
        id: 3,
        module: 'track',
        title: 'Tracking',
        hasChildren: true,
        gate: 'all', 
        icon: {
            type: 'icon',
            value: 'mdi-radar'
        },
        children: [
            {
                id: 1,
                title: 'Deliveries',
                subModule: 'track/delivery',
                gate: 'all',
                to: '/tracking/delivery'
            },
        ]
    },

    {
        id: 4,
        module: 'sale',
        title: 'Sales',
        hasChildren: true,
        gate: 'access_to_sales', 
        icon: {
            type: 'icon',
            value: 'mdi-sale'
        },
        children: [
            {
                id: 1,
                title: 'Sales list',
                subModule: 'sale/list',
                gate: 'show_all_sales',
                to: '/sales'
            },
        ]
    },

    {
        id: 5,
        module: 'order',
        title: 'Orders',
        hasChildren: true,
        gate: 'access_to_orders', 
        icon: {
            type: 'icon',
            value: 'mdi-barcode-scan'
        },
        children: [
            {
                id: 1,
                title: 'Order',
                subModule: 'order/show',
                gate: 'show_all_orders',
                to: '/order'
            },
            {
                id: 2,
                title: 'My Orders',
                subModule: 'order/list',
                gate: 'show_all_orders',
                to: '/orders'
            },
            {
                id: 3,
                title: 'Confirmed Orders',
                subModule: 'order/confirmed',
                gate: 'show_all_orders',
                to: '/orders/confirmed'
            },
        ]
    },

    {
        id: 6,
        module: 'delivery',
        title: 'Orders',
        hasChildren: true,
        gate: 'access_to_delivery', 
        icon: {
            type: 'icon',
            value: 'mdi-bike'
        },
        children: [
            {
                id: 1,
                title: 'Orders List',
                subModule: 'delivery/list',
                gate: 'show_all_deliveries',
                to: '/deliveries'
            },
            {
                id: 2,
                title: 'Orders Delivered',
                subModule: 'delivery/delivered',
                gate: 'show_all_deliveries',
                to: '/delivered'
            },
        ]
    },

    {
        id: 7,
        module: 'inventory',
        title: 'Inventory',
        hasChildren: true,
        gate: 'access_to_inventory', 
        icon: {
            type: 'icon',
            value: 'mdi-warehouse'
        },
        children: [
            {
                id: 1,
                title: 'Inventory State',
                gate: 'show_all_inventory_states',
                subModule: 'inventory/state',
                to: '/inventories'
            },
            {
                id: 2,
                title: 'Inventory Movements',
                gate: 'show_all_inventory_movements',
                subModule: 'inventory/movements',
                to: '/inventories/movements'
            },
            {
                id: 4,
                title: 'Add Movement',
                gate: 'create_inventory_movement',
                subModule: 'inventory/add',
                to: '/inventories/add'
            }
        ]
    },



    {
        id: 8,
        title: 'Users',
        module: 'user',
        gate: 'access_to_users',
        hasChildren: true,
        icon: {
            type: 'svg',
            value: 'assets/img/icons/users1.svg'
        },
        children: [
            {
                id: 1,
                title: 'Users List',
                subModule: 'user/list',
                gate: 'show_all_users',
                to: '/users'
            },
            {
                id: 2,
                title: 'Add User',
                subModule: 'user/add',
                gate: 'create_user',
                to: '/users/add'
            },
            {
                id: 3,
                title: 'Roles List',
                subModule: 'user/roles',
                gate: 'show_all_roles',
                to: '/users/roles'
            },
            {
                id: 4,
                title: 'Add Role',
                subModule: 'user/addRole',
                gate: 'create_role',
                to: '/users/addRole'
            }
        ]
    },

    {
        id: 9,
        title: 'Settings',
        module: 'settings',
        to: '/settings',
        gate: 'all',
        hasChildren: false,
        icon: {
            type: 'svg',
            value: 'assets/img/icons/settings.svg'
        }
    },

    {
        id: 10,
        title: 'Test',
        module: 'test',
        to: '/test',
        hasChildren: false,
        gate: 'all',
        icon: {
            type: 'icon',
            value: 'mdi-hammer-wrench'
        }
    }
]