// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import SubCategoryListView from '@/views/subcategory/SubCategoryListView'
import AddSubCategoryView from '@/views/subcategory/AddSubCategoryView'


export default 
    {
        name: 'subcategories',
        path: '/subcategories',
        component: DefaultLayout,
        meta: {
            module: 'product'
        },

        children: [

            // Category routes
            {
                name: 'subcategory/list',
                path: '',
                component: SubCategoryListView,
                meta: {
                    module: 'product',
                    subModule: 'subcategory/list',
                    title: 'Sub Categories List'
                }
            },

            {
                name: 'subcategory/add',
                path: '/subcategories/add',
                component: AddSubCategoryView,
                meta: {
                    module: 'product',
                    subModule: 'subcategory/add',
                    title: 'Add Sub Category'
                }
            },
        ]
    }
