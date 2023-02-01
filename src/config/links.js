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
                title: 'Product List',
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
        id: 2,
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
        id: 8,
        title: 'Orders',
        module: 'orders',
        hasChildren: true,
        gate: 'order_access',
        icon: {
            type: 'icon',
            value: 'mdi-package-variant-closed'
        },
        children: [
            {
                id: 1,
                title: 'Orders List',
                subModule: 'order/list',
                gate: 'order_show',
                to: '/orders'
            },
            {
                id: 2,
                title: 'Add Order',
                subModule: 'order/add',
                gate: 'order_create',
                to: '/order/add'
            },
        ]
    },

    {
        id: 3,
        title: 'Sales',
        module: 'sales',
        hasChildren: true,
        gate: 'sale_access',
        icon: {
            type: 'svg',
            value: 'assets/img/icons/sales1.svg'
        },
        children: [
            {
                id: 1,
                title: 'Sales List',
                subModule: 'sales/list',
                gate: 'sale_show',
                to: '/sales'
            },
            {
                id: 2,
                title: 'New Sales',
                subModule: 'sales/add',
                gate: 'sale_create',
                to: '/sales/add'
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
    }
]