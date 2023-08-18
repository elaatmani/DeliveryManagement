<template>
  <div v-if="exists">
    <component :is="dashboard"></component>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'
import AdminDashboard from '@/views/dashboard/dashboards/AdminDashboard'
import DeliveryDashboard from './dashboards/DeliveryDashboard.vue'
import AgenteDashboard from './dashboards/AgenteDashboard.vue'
import DefaultDashboard from './dashboards/DefaultDashboard.vue'
import FollowUpDashboard from '@/views/dashboard/dashboards/FollowUpDashboard'

export default {
    components: { 
        admin: AdminDashboard,
        delivery: DeliveryDashboard,
        agente: AgenteDashboard,
        default: DefaultDashboard,
        'follow-up': FollowUpDashboard
     },

    data() {
        return {
            localUrl,
            exists: false
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/user']
        },
        dashboard() {
            
            return ['admin', 'delivery', 'agente', 'follow-up'].includes(this.user.role) ? this.user.role : 'default'
        },
        
    },
    methods: {
        check() {
            switch (this.user.role) {
            case 'admin':
                this.$router.push({name: 'dashboards/admin'})
            break;
        
            default:
                this.exists = true;
            break;
        }
        }
    },

    mounted() {
        this.check();
        // this.exists = true
    }

}
</script>

<style>

</style>