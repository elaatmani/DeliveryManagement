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
        gate: 'product_access', 
        icon: {
            type: 'svg',
            value: 'assets/img/icons/product.svg'
        },
        children: [
            {
                id: 1,
                title: 'Products List',
                subModule: 'product/list',
                gate: 'product_show',
                to: '/products'
            },
            {
                id: 2,
                title: 'Add Product',
                subModule: 'product/add',
                gate: 'product_create',
                to: '/products/add'
            },
            {
                id: 3,
                title: 'Category List',
                subModule: 'category/list',
                gate: 'category_show',
                to: '/categories'
            },
            {
                id: 4,
                title: 'Add Category',
                gate: 'category_create',
                subModule: 'category/add',
                to: '/categories/add'
            },
        ]
    },

    {
        id: 10,
        module: 'sale',
        title: 'Sales',
        hasChildren: true,
        gate: 'all', 
        icon: {
            type: 'icon',
            value: 'mdi-sale'
        },
        children: [
            {
                id: 1,
                title: 'Sales list',
                subModule: 'sale/list',
                gate: 'all',
                to: '/sales'
            },
        ]
    },

    {
        id: 11,
        module: 'order',
        title: 'Orders',
        hasChildren: true,
        gate: 'all', 
        icon: {
            type: 'icon',
            value: 'mdi-barcode-scan'
        },
        children: [
            {
                id: 1,
                title: 'Order',
                subModule: 'order/show',
                gate: 'all',
                to: '/order'
            },
            {
                id: 2,
                title: 'My Orders',
                subModule: 'order/list',
                gate: 'all',
                to: '/orders'
            },
            {
                id: 3,
                title: 'Confirmed Orders',
                subModule: 'order/confirmed',
                gate: 'all',
                to: '/orders/confirmed'
            },
        ]
    },

    {
        id: 16,
        module: 'delivery',
        title: 'Orders',
        hasChildren: true,
        gate: 'all', 
        icon: {
            type: 'icon',
            value: 'mdi-bike'
        },
        children: [
            {
                id: 1,
                title: 'Orders List',
                subModule: 'delivery/list',
                gate: 'all',
                to: '/deliveries'
            },
            {
                id: 2,
                title: 'Orders Delivered',
                subModule: 'delivery/delivered',
                gate: 'all',
                to: '/delivered'
            },
        ]
    },

    {
        id: 7,
        module: 'inventory',
        title: 'Inventory',
        hasChildren: true,
        gate: 'inventory_state_access', 
        icon: {
            type: 'icon',
            value: 'mdi-warehouse'
        },
        children: [
            {
                id: 1,
                title: 'Inventory List',
                gate: 'inventory_state_show',
                subModule: 'inventory/list',
                to: '/inventories'
            },
            {
                id: 2,
                title: 'Inventory State',
                gate: 'inventory_state_show',
                subModule: 'inventory/list',
                to: '/inventories/state'
            },
            {
                id: 3,
                title: 'Inventory Movements',
                gate: 'inventory_movement_show',
                subModule: 'inventory/movements',
                to: '/inventories/movements'
            }
        ]
    },



    {
        id: 6,
        title: 'Users',
        module: 'user',
        gate: 'users_access',
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
                gate: 'users_show',
                to: '/users'
            },
            {
                id: 2,
                title: 'Add User',
                subModule: 'user/add',
                gate: 'users_create',
                to: '/users/add'
            },
            {
                id: 3,
                title: 'Roles List',
                subModule: 'user/roles',
                gate: 'users_create',
                to: '/users/roles'
            },
            {
                id: 4,
                title: 'Add Role',
                subModule: 'user/addRole',
                gate: 'users_create',
                to: '/users/addRole'
            }
        ]
    },

    {
        id: 4,
        title: 'Settings',
        module: 'settings',
        to: '/setings',
        gate: 'settings_access',
        hasChildren: false,
        icon: {
            type: 'svg',
            value: 'assets/img/icons/settings.svg'
        }
    },

    {
        id: 5,
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