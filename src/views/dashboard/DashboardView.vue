<template>
  <div>
    <component :is="dashboard"></component>
  </div>
</template>

<script>
import { localUrl } from '@/config/config'
import AdminDashboard from '@/views/dashboard/dashboards/AdminDashboard'
import DeliveryDashboard from './dashboards/DeliveryDashboard.vue'
import AgenteDashboard from './dashboards/AgenteDashboard.vue'
import DefaultDashboard from './dashboards/DefaultDashboard.vue'

export default {
    components: { 
        admin: AdminDashboard,
        delivery: DeliveryDashboard,
        agente: AgenteDashboard,
        default: DefaultDashboard
     },

    data() {
        return {
            localUrl,
        }
    },
    computed: {
        user() {
            return this.$store.getters['user/user']
        },
        dashboard() {
            
            return ['admin', 'delivery', 'agente'].includes(this.user.role) ? this.user.role : 'default'
        },
        
    },
    mounted() {
        console.log(this.user);
    }

}
</script>

<style>

</style>