// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import AdsListView from '@/views/ads/AdsListView'



export default 
    {
        name: 'ads',
        path: '/ads',
        component: DefaultLayout,
        meta: {
            module: 'ads'
        },

        children: [

            // Adss routes
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
        ]
    }
