// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import SheetsListView from '@/views/sheet/SheetsListView'


export default 
    {
        name: 'sheets',
        path: '/sheets',
        component: DefaultLayout,
        meta: {
            module: 'sheet'
        },

        children: [
            { 
                name: 'sheet/list',
                path: '',
                component: SheetsListView,
                meta: {
                    module: 'sheet',
                    subModule: 'sheet/list',
                    title: 'Google Sheets List',
                    gate: 'show_all_sheets'
                }
            },

        ]
    }
