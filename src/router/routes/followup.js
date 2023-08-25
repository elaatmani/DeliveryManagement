import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
// import FollowUpOrders from '@/views/followup/FollowUpOrders'
import FollowUpOrders from '@/views/newfollowup/FollowUpOrders'


export default {

        path: '/followup',
        name: 'followup',
        component: DefaultLayout,
        meta: {
          module: 'dashboard'
        },
        children: [
          {
              name: 'followup/index',
              path: '',
            component: FollowUpOrders,
            meta: {
              module: 'followup',
              title: 'Follow Up Orders',
              gate: 'follow_up_orders'
            }
          },
        ]
}