// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import ShopListView from '@/views/shop/ShopListView'
import AddShopView from '@/views/shop/partials/AddShopView'
import UpdateShopView from '@/views/shop/partials/UpdateShopView'

export default 
    {
        name: 'shops',
        path: '/shops',
        component: DefaultLayout,
        meta: {
            module: 'shop'
        },

        children: [

            // Product routes
            { 
                name: 'shop/list',
                path: '',
                component: ShopListView,
                meta: {
                    module: 'shop',
                    subModule: 'shop/list',
                    title: 'Shop List',
                    gate: 'show_all_sales'
                }
            },
             
              { 
                name: 'shop/add',
                path: 'add',
                component: AddShopView,
                meta: {
                    module: 'shop',
                    subModule: 'shop/add',
                    title: 'Shop Add',
                    gate: 'create_shop'
                }
            },
            { 
                name: 'shop/update',
                path: 'update/:id',
                component: UpdateShopView,
                meta: {
                    module: 'shop',
                    subModule: 'shop/update',
                    title: 'Update Shop',
                    gate: 'update_shop'
                }
            },

        ]
    }
