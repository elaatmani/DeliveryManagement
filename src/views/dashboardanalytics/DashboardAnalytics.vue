<template>
    <div class="tw-pb-40">
        <div class="tw-space-y-3">


            <IndexFilters @update="f => filters = f" @filter="handleFilter" />

            <RevenueContainer @register="register" :filters="filters" @loaded="handleProfitLoaded"  />

            <IndexAnalytics :analytics="fullAnalytics" :fetching="fetching" />

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
import RevenueContainer from './partials/RevenueContainer.vue';
import ProfitPerProductChart from './partials/products/ProfitPerProductChart'


import Admin from '@/api/Admin';

export default {
    components: { IndexAnalytics, IndexFilters, RevenueContainer, ProfitPerProductChart },

    data() {
        return {
            filters: {},
            analytics: [],
            fetching: true,
            callbacks: [],
            profit: null,

        }
    },

    computed: {
        user() {
            return this.$store.getters['user/user'];
        },

        fullAnalytics() {
            if(this.profit) return [...this.analytics, this.profit]
            return this.analytics
        }
    },

    methods: {
        register(callback) {
            this.callbacks.push(callback)
        },
        handleFilter() {
            // console.log(this.filters);
            
            this.callbacks.forEach(callback => callback(this.filters));
            this.fetching = true;

            Admin.analytics(this.filters)
                .then(res => {
                    if (res.data.code == 'SUCCESS') {

                        this.analytics = res.data.data.analytics.analytics;


                        this.fetching = false;
                    }

                })
                .catch(this.$handleApiError);
        },

        handleProfitLoaded(profit) {
            let data = {
                    "id": 10,
                    "title": "Profit",
                    "value": profit,
                    "icon": "mdi-currency-usd",
                    "color": "#16a34a"
                };

            this.profit = data
            
        }
    },

    mounted() {
        if (this.user.role != 'admin') this.$router.push({ name: '404' });

    },
    provide() {
        return {
            filters: this.filters
        }
    }
}
</script>

<style></style>