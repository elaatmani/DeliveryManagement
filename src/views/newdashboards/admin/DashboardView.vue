<template>
  <div class="tw-pb-40">
    <div class="tw-space-y-3">

        <div class="tw-grid tw-grid-cols-3 tw-gap-4">
            <div>
                <OrdersByDayChart />
            </div>
            <div>
                <ConfirmedByDayChart />
            </div>
            <div>
                <DeliveredByDayChart />
            </div>
        </div>

        <RealTimeOnlineUsers />
        
        <OnlineUsers v-if="false" />

        <IndexFilters @update="f => filters= f" @filter="handleFilter" />

        <IndexRevenue v-if="false" :statistics="statistics" :fetching="fetching" />

        <RevenueContainer v-if="false" @register="register" :filters="filters"  />
        
        <IndexStatistics :statistics="statistics" :fetching="fetching" />     

    </div>
  </div>
</template>

<script>
import OnlineUsers from '@/views/newdashboards/admin/partials/users/OnlineUsers';
import RealTimeOnlineUsers from '@/views/newdashboards/admin/partials/users/RealTimeOnlineUsers';
import IndexStatistics from '@/views/newdashboards/admin/partials/statistics/IndexStatistics'
import IndexFilters from '@/views/newdashboards/admin/partials/filters/IndexFilters'
import IndexRevenue from '@/views/newdashboards/admin/partials/statistics/IndexRevenue'
import RevenueContainer from './partials/RevenueContainer.vue';

import OrdersByDayChart from './partials/charts/OrdersByDayChart.vue';
import ConfirmedByDayChart from './partials/charts/ConfirmedByDayChart.vue';
import DeliveredByDayChart from './partials/charts/DeliveredByDayChart.vue';

import Admin from '@/api/Admin';

export default {
    components: { OnlineUsers, IndexStatistics, IndexFilters, IndexRevenue, RealTimeOnlineUsers, RevenueContainer, OrdersByDayChart, ConfirmedByDayChart, DeliveredByDayChart },

    data() {
        return {
            filters: null,
            statistics: null,
            fetching: true,
            callbacks: []
        }
    },

    computed: {
        user() {
            return this.$store.getters['user/user'];
        }
    },

    methods: {
        register(callback) {
            this.callbacks.push(callback)
        },

        handleFilter() {
            this.callbacks.forEach(callback => callback());
            this.fetching = true;
            Admin.statistics(this.filters)
            .then(res => {
                if(res.data.code == 'SUCCESS') {
                    this.statistics = res.data.data.statistics;
                    console.log(this.statistics); // Log the statistics
                    this.fetching = false;
                }
            })
            .catch(this.$handleApiError);
        }
    },

    mounted() {
        if(this.user.role != 'admin') this.$router.push({name: '404'});
    }
}
</script>

<style>

</style>