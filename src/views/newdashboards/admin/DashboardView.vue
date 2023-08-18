<template>
  <div class="tw-pb-40">
    <div class="tw-space-y-3">
        <OnlineUsers />

        <IndexFilters @update="f => filters= f" @filter="handleFilter" />

        <IndexRevenue :statistics="statistics" :fetching="fetching" />
        
        <IndexStatistics :statistics="statistics" :fetching="fetching" />        

    </div>
  </div>
</template>

<script>
import OnlineUsers from '@/views/newdashboards/admin/partials/users/OnlineUsers';
import IndexStatistics from '@/views/newdashboards/admin/partials/statistics/IndexStatistics'
import IndexFilters from '@/views/newdashboards/admin/partials/filters/IndexFilters'
import IndexRevenue from '@/views/newdashboards/admin/partials/statistics/IndexRevenue'

import Admin from '@/api/Admin';

export default {
    components: { OnlineUsers, IndexStatistics, IndexFilters, IndexRevenue },

    data() {
        return {
            filters: null,
            statistics: null,
            fetching: true,
        }
    },

    computed: {
        user() {
            return this.$store.getters['user/user'];
        }
    },

    methods: {
        handleFilter() {
            this.fetching = true;
            Admin.statistics(this.filters)
            .then(res => {
                if(res.data.code == 'SUCCESS') {
                    this.statistics = res.data.data.statistics;
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