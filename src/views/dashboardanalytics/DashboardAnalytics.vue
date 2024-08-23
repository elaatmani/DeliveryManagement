<template>
    <div class="tw-pb-40">
        <div class="tw-space-y-3">


            <IndexFilters @update="f => filters = f" @filter="handleFilter" />

            <RevenueContainer @register="register" :filters="filters"  />

            <IndexAnalytics :analytics="analytics" :fetching="fetching" />

            <div class="tw-grid tw-grid-cols-12 tw-gap-3">
                <div class="tw-col-span-12 md:tw-col-span-12">
                    <ProfitPerProductChart @register="register" :filters="filters" />
                </div>
            </div>



        </div>
    </div>
</template>

<script>
import IndexAnalytics from '@/views/dashboardanalytics/partials/analytics/IndexAnalytics'
import IndexFilters from '@/views/dashboardanalytics/partials/filters/IndexFilters'
import RevenueContainer from '@/views/newdashboards/admin/partials/RevenueContainer.vue';
import ProfitPerProductChart from '@/views/dashboardanalytics/partials/products/ProfitPerProductChart'


import Admin from '@/api/Admin';

export default {
    components: { IndexAnalytics, IndexFilters, RevenueContainer, ProfitPerProductChart },

    data() {
        return {
            filters: null,
            analytics: null,
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

            Admin.analytics(this.filters)
                .then(res => {
                    if (res.data.code == 'SUCCESS') {

                        this.analytics = res.data.data.analytics.analytics;


                        this.fetching = false;
                    }

                })
                .catch(this.$handleApiError);
        }
    },

    mounted() {
        if (this.user.role != 'admin') this.$router.push({ name: '404' });

    }
}
</script>

<style></style>