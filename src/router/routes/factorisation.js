// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import FactorisationListView from '@/views/factorisation/FactorisationListView'
import FactorisationView from '@/views/newfactorisation/FactorisationView'


export default 
    {
        name: 'factorisations',
        path: '/factorisations',
        component: DefaultLayout,
        meta: {
            module: 'factorisation'
        },

        children: [
            { 
                name: 'factorisation/list',
                path: '',
                component: FactorisationListView,
                meta: {
                    module: 'factorisation',
                    subModule: 'factorisation/list',
                    title: 'Factorisations List',
                    gate: 'show_all_factorisations'
                }
            },
            { 
                name: 'factorisation/newlist',
                path: '/newfactorisations',
                component: FactorisationView,
                meta: {
                    module: 'newfactorisation',
                    subModule: 'factorisation/newlist',
                    title: 'Factorisations List',
                    gate: 'show_all_factorisations'
                }
            },

        ]
    }
