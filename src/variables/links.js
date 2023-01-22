// ---------------------------------------------------------------------------
// link structure
//   - id
//   - title
//   - hasChildren: has any sub links ? true/false
//   - module: should be same as meta.module in router
//   - icon: 
//     - type: icon/svg
//     - value: icon name/ svg path **it should be in public folder** 
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
        icon: {
            type: 'svg',
            value: 'assets/img/icons/product.svg'
        },
        children: [
            {
                id: 1,
                title: 'Product List',
                subModule: 'product/list',
                to: '/products'
            },
            {
                id: 2,
                title: 'Add Product',
                subModule: 'product/add',
                to: '/products/add'
            },
            {
                id: 3,
                title: 'Category List',
                subModule: 'category/list',
                to: '/categories'
            },
            {
                id: 4,
                title: 'Add Category',
                subModule: 'category/add',
                to: '/categories/add'
            },
            {
                id: 5,
                title: 'Sub Category List',
                subModule: 'subcategory/list',
                to: '/subcategories'
            },
            {
                id: 6,
                title: 'Add Sub Category',
                subModule: 'subcategory/add',
                to: '/subcategories/add'
            },
            {
                id: 7,
                title: 'Brand List',
                subModule: 'brand/list',
                to: ''
            },
            {
                id: 8,
                title: 'Add Brand',
                subModule: 'brand/add',
                to: ''
            },
            {
                id: 9,
                title: 'Import Products',
                subModule: 'import',
                to: ''
            }
        ]
    },


    {
        id: 3,
        title: 'Sales',
        module: 'sales',
        hasChildren: true,
        icon: {
            type: 'svg',
            value: 'assets/img/icons/sales1.svg'
        },
        children: [
            {
                id: 1,
                title: 'Sales List',
                subModule: 'sales/list',
                to: '/sales'
            },
            {
                id: 2,
                title: 'New Sales',
                subModule: 'sales/new',
                to: '/sales/new'
            }
        ]
    }
]