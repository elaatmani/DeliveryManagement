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

export const disabled_links = [4, 6, 7];

export const links = [

    {
        id: 1,
        title: 'Dashboard',
        module: 'dashboard',
        hasChildren: true,
        gate: 'all',
        icon: {
            type: 'svg',
            value: 'assets/img/icons/dashboard.svg'
        },
        children: [
            {
                id: 1,
                title: 'Overview',
                subModule: 'dashboard/dashboard',
                gate: 'all',
                to: '/'
            },
            {
                id: 2,
                title: 'Analytics',
                subModule: 'dashboard/analytics',
                gate: 'access_to_analytics',
                to: '/analytics'
            },
            {
                id: 3,
                title: 'Charts',
                subModule: 'admin/charts',
                role: 'admin',
                to: '/dashboards/admin/charts'
            },
        ]
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
                title: 'New Products List',
                subModule: 'product/newlist',
                gate: 'show_all_products',
                to: '/newproducts'
            },
            {
                id: 3,
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
        gate: 'none', 
        icon: {
            type: 'icon',
            value: 'mdi-radar'
        },
        children: [
            {
                id: 1,
                title: 'Deliveries',
                subModule: 'track/delivery',
                gate: 'none',
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
            {
                id: 2,
                title: 'Expidation',
                subModule: 'sale/expidation',
                gate: 'show_all_expidations',
                to: '/sales/expidation'
            },
            {
                id: 3,
                title: 'Shipping',
                subModule: 'sale/shipping',
                gate: 'show_all_expidations',
                to: '/sales/shipping'
            },
            {
                id: 4,
                title: 'Follow Up',
                subModule: 'sale/followup',
                gate: 'show_all_expidations',
                to: '/sales/followup'
            }
        ]
    },

    {
        id: 5,
        module: 'factorisation',
        title: 'Factorisation',
        hasChildren: true,
        gate: 'access_to_factorisations', 
        icon: {
            type: 'icon',
            value: 'mdi-note-multiple'
        },
        children: [
            {
                id: 1,
                title: 'Factorisation list',
                subModule: 'factorisation/list',
                gate: 'show_all_factorisations',
                to: '/factorisations'
            },
            {
                id: 2,
                title: 'New Factorisation list',
                subModule: 'factorisation/newlist',
                gate: 'show_all_factorisations',
                to: '/newfactorisations'
            }
        ]
    },

    {
        id: 20,
        module: 'ads',
        title: 'Ads',
        hasChildren: true,
        gate: 'access_to_ads', 
        icon: {
            type: 'icon',
            value: 'mdi-google-ads'
        },
        children: [
            {
                id: 1,
                title: 'Ads list',
                subModule: 'ads/list',
                gate: 'show_all_ads',
                to: '/ads'
            },
        ]
    },
    
    {
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
        module: 'shop',
        title: 'Shop',
        hasChildren: true,
        gate: 'access_to_shop', 
        icon: {
            type: 'icon',
            value: 'mdi-store'
        },
        children: [
            {
                id: 1,
                title: 'Shop List',
                gate: 'show_all_shops',
                subModule: 'shop/list',
                to: '/shops'
            },
            {
                id: 2,
                title: 'Add Shop',
                gate: 'create_shop',
                subModule: 'shop/add',
                to: '/shops/add'
            }
        ]
    },
    {
        id: 10,
        module: 'warehouse',
        title: 'Warehouses',
        hasChildren: true,
        gate: 'access_to_warehouse', 
        icon: {
            type: 'icon',
            value: 'mdi-home-group'
        },
        children: [
            {
                id: 1,
                title: 'Warehouses list',
                subModule: 'warehouse/list',
                gate: 'show_all_warehouses',
                to: '/warehouses'
            },
        ]
    },
    {
        id: 11,
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
        id: 15,
        title: 'Sheets',
        module: 'sheets',
        to: '/sheets',
        gate: 'access_to_sheets',
        hasChildren: false,
        icon: {
            type: 'icon',
            value: 'mdi-note-text-outline'
        }
    },

    {
        id: 12,
        title: 'Settings',
        module: 'settings',
        gate: 'access_to_account',
        hasChildren: true,
        icon: {
            type: 'svg',
            value: 'assets/img/icons/settings.svg'
        },
        children: [
            {
                id: 1,
                title: 'Account',
                subModule: 'settings/account',
                gate: 'access_to_account',
                to: '/settings/account'
            },
            {
                id: 1,
                title: 'Blacklist',
                subModule: 'settings/blacklist',
                gate: 'access_to_account',
                to: '/settings/blacklist'
            }
        ]
    },

    {
        id: 13,
        title: 'Orders',
        module: 'followup',
        to: '/followup',
        hasChildren: false,
        gate: 'follow_up_orders',
        icon: {
            type: 'icon',
            value: 'mdi-package-variant-closed'
        }
    },

    // {
    //     id: 10,
    //     title: 'Test',
    //     module: 'test',
    //     to: '/test',
    //     hasChildren: false,
    //     gate: 'all',
    //     icon: {
    //         type: 'icon',
    //         value: 'mdi-hammer-wrench'
    //     }
    // }
]