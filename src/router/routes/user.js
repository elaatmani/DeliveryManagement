// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import UserListView from '@/views/user/UserListView'
import AddUserView from '@/views/user/AddUserView'
import UserUpdateView from '@/views/user/UserUpdateView'
import AddRoleView from '@/views/role/AddRoleView'
import RoleListView from '@/views/role/RoleListView'
import UpdateRoleView from '@/views/role/UpdateRoleView'


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
                    gate: 'show_all_users'
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
                    gate: 'create_user'
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
                    gate: 'update_user'
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
                    gate: 'create_role'
                }
            },

            { 
                name: 'user/roles',
                path: 'roles',
                component: RoleListView,
                meta: {
                    module: 'user',
                    subModule: 'user/roles',
                    title: 'Roles List',
                    gate: 'show_all_roles'
                }
            },

            { 
                name: 'user/updateRole',
                path: 'roles/update/:id',
                component: UpdateRoleView,
                meta: {
                    module: 'user',
                    subModule: 'user/updateRole',
                    title: 'Update Role',
                    gate: 'view_role'
                }
            },

        ]
    }
