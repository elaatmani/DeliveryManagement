// Layout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import AdsListView from '@/views/ads/AdsListView'
import AdsAccountView from '@/views/adsaccount/AdsAccountView'

export default 
    {
        name: 'ads',
        path: '/ads',
        component: DefaultLayout,
        meta: {
            module: 'ads'
        },

        children: [

            // Ads routes
            { 
                name: 'ads/list',
                path: '',
                component: AdsListView,
                meta: {
                    module: 'ads',
                    subModule: 'ads/list',
                    title: 'Ads List',
                    gate: 'show_all_ads'
                }
            },
            { 
                name: 'ads/adaccounts',
                path: '/adaccounts',
                component: AdsAccountView,
                meta: {
                    module: 'ads',
                    subModule: 'ads/adaccounts',
                    title: 'Ad Accounts',
                    gate: 'show_all_ads'
                }
            },
        ]
    }