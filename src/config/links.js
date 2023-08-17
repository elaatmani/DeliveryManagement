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
        to: '/',
        hasChildren: false,
        gate: 'all',
        icon: {
            type: 'svg',
            value: 'assets/img/icons/dashboard.svg'
        },
        // children: [
        //     {
        //         id: 1,
        //         title: 'Dashboard Analytics',
        //         subModule: '/',
        //         gate: 'all',
        //         to: '/'
        //     },
            // {
            //     id: 2,
            //     title: 'Dashboard Operational',
            //     subModule: 'dashboard/operational',
            //     gate: 'all',
            //     to: '/dashboard/operational'
            // },
        // ]
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
        id: 4,
        module: 'sale',
        title: 'Sales',
        hasChildren: false,
        gate: 'access_to_sales', 
        to : '/sales',
        icon: {
            type: 'icon',
            value: 'mdi-sale'
        },
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
    },


]