import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import SettingsAccountView from '@/views/settings/SettingsAccountView'
import SettingsBlacklistView from '@/views/settings/SettingsBlacklistView'


export default {
    name: 'settings',
    path: '/settings',
    component: DefaultLayout,
    meta: {
        module: 'user'
    },
    children: [
        {
            path: 'account',
            name: 'settings/account',
            component: SettingsAccountView,
            meta: {
                module: 'settings',
                title: 'Account',
                gate: 'all'
            }
        },
        {
            path: 'blacklist',
            name: 'settings/blacklist',
            component: SettingsBlacklistView,
            meta: {
                module: 'settings',
                title: 'Blacklist',
                gate: 'all'
            }
        }
    ]
}