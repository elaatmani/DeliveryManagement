// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import UserListView from '@/views/user/UserListView'
import AddUserView from '@/views/user/AddUserView'
import UserUpdateView from '@/views/user/UserUpdateView'
import AddRoleView from '@/views/user/AddRoleView'


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
                path: 'add',
                component: AddUserView,
                meta: {
                    module: 'user',
                    subModule: 'user/add',
                    title: 'Add User',
                    gate: 'users_create'
                }
            },

            { 
                name: 'user/update',
                path: 'update/:id',
                component: UserUpdateView,
                meta: {
                    module: 'user',
                    subModule: 'user/update',
                    title: 'Update User',
                    gate: 'users_update'
                }
            },

            { 
                name: 'user/addRole',
                path: 'addRole',
                component: AddRoleView,
                meta: {
                    module: 'user',
                    subModule: 'user/addRole',
                    title: 'Add Role',
                    gate: 'users_create'
                }
            },

        ]
    }
