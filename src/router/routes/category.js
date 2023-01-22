// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import CategoryListView from '@/views/category/CategoryListView'
import AddCategoryView from '@/views/category/AddCategoryView'


export default 
    {
        name: 'categories',
        path: '/categories',
        component: DefaultLayout,
        meta: {
            module: 'product'
        },

        children: [

            // Category routes
            {
                name: 'category/list',
                path: '',
                component: CategoryListView,
                meta: {
                    module: 'product',
                    subModule: 'category/list'
                }
            },

            {
                name: 'category/add',
                path: '/categories/add',
                component: AddCategoryView,
                meta: {
                    module: 'product',
                    subModule: 'category/add'
                }
            },
        ]
    }
