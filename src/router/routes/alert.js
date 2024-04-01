// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import AlertListView from '@/views/alerts/IndexView'



export default 
    {
        name: 'alerts',
        path: '/alerts',
        component: DefaultLayout,
        meta: {
            module: 'alerts'
        },

        children: [

            // Adss routes
            { 
                name: 'alert/list',
                path: '',
                component: AlertListView,
                meta: {
                    module: 'alert',
                    subModule: 'alert/list',
                    title: 'Alerts List',
                    role: ['admin']
                }
            },
        ]
    }
