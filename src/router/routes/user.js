// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import UserListView from '@/views/user/UserListView'
import AddUserView from '@/views/user/AddUserView'


export default 
    {
        name: 'users',
        path: '/users',
        component: DefaultLayout,
        meta: {
            module: 'user'
        },

        children: [

            // Product routes
            { 
                name: 'user/list',
                path: '',
                component: UserListView,
                meta: {
                    module: 'user',
                    subModule: 'user/list',
                    title: 'Users List',
                    gate: 'users_show'
                }
            },

            { 
                name: 'user/add',
                path: '/users/add',
                component: AddUserView,
                meta: {
                    module: 'user',
                    subModule: 'user/add',
                    title: 'Add User',
                    gate: 'users_create'
                }
            },

        ]
    }
