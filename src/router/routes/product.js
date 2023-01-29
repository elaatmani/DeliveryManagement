// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import ProductListView from '@/views/product/ProductListView'
import AddProductView from '@/views/product/AddProductView'


export default 
    {
        name: 'products',
        path: '/products',
        component: DefaultLayout,
        meta: {
            module: 'product'
        },

        children: [

            // Product routes
            { 
                name: 'product/list',
                path: '',
                component: ProductListView,
                meta: {
                    module: 'product',
                    subModule: 'product/list',
                    title: 'Products List',
                    gate: 'product_show'
                }
            },

            { 
                name: 'product/add',
                path: 'add',
                component: AddProductView,
                meta: {
                    module: 'product',
                    subModule: 'product/add',
                    title: 'Add Product',
                    gate: 'product_create'
                }
            },

        ]
    }
