import DefaultLayout from '@/layouts/default/DefaultLayout.vue';

// import AdminSourcingView from '@/views/sourcing/pages/AdminSourcingView'
import IndexSourcingView from '@/views/sourcing/pages/IndexSourcingView'
// import SellerSourcingView from '@/views/sourcing/pages/SellerSourcingView'
import ShowSourcingView from '@/views/sourcing/pages/ShowSourcingView'
import CreateSourcingView from '@/views/sourcing/pages/CreateSourcingView'

export default 
    {
        name: 'sourcings',
        path: '/sourcings',
        component: DefaultLayout,
        meta: {
            module: 'sourcing'
        },

        children: [
            {
                name: 'sourcings.index',
                path: '',
                component: IndexSourcingView,
                meta: {
                    module: 'sourcing',
                    title: 'Sourcing',
                    role: ['admin']
                }
            },

            {
                name: 'sourcings.admin',
                path: 'admin',
                redirect: { name: 'sourcings.index' }
            },
            
            {
                name: 'sourcings.seller',
                path: 'seller',
                redirect: { name: 'sourcings.index' }
                
            },

            {
                name: 'sourcings.new',
                path: 'new',
                component: CreateSourcingView,
                meta: {
                    module: 'sourcing',
                    title: 'New Sourcing',
                    role: ['admin']
                }
            },

            {
                name: 'sourcings.show',
                path: ':id',
                component: ShowSourcingView,
                meta: {
                    module: 'sourcing',
                    title: 'Sourcing',
                    role: ['admin']
                }
            },
        ]
    }