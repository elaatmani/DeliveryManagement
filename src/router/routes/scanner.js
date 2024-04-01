// Layoout
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'

// Views
import ScannerView from '@/views/qrcode/ScannerView'



export default 
    {
        name: 'scanner',
        path: '/scanner',
        component: DefaultLayout,
        meta: {
            module: 'qrcode'
        },

        children: [

            // qrcode routes
            { 
                name: 'scanner/code',
                path: '',
                component: ScannerView,
                meta: {
                    module: 'scaanner',
                    subModule: 'scaanner/code',
                    title: 'Scanner',
                    role:'admin'
                }
            },
        ]
    }
