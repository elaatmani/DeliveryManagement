<template>
    <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-12 tw-gap-4">
        <div class="tw-col-span-1 sm:tw-col-span-2 lg:tw-col-span-6">
            <ProgressionBar />
        </div>

        <div class="tw-col-span-1 sm:tw-col-span-2 lg:tw-col-span-6">
            <RankingMarketer />
        </div>

        <div class="tw-col-span-1 lg:tw-col-span-12">
            <AnalitycsMarketer :statistics="statistics" :fetching="fetching" />
        </div>

        <div
            class="tw-col-span-1 sm:tw-col-span-2 lg:tw-col-span-4 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <SourceDonutsCharts />
        </div>

        <div
            class="tw-col-span-1 sm:tw-col-span-2 lg:tw-col-span-8 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <CostPerDay />
        </div>

        <div
            class="tw-col-span-1 lg:tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <LeadsChart />
        </div>

        <div
            class="tw-col-span-1 lg:tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <AmountPerLead />
        </div>
    </div>

</template>

<script setup>
import AmountPerLead from './charts/partials/AmountPerLead';
import LeadsChart from './charts/partials/LeadsChart';
import { ref } from 'vue'
import SourceDonutsCharts from './charts/partials/SourceDonutsCharts';
import CostPerDay from './charts/partials/CostPerDay';
import ProgressionBar from './charts/partials/ProgressionBar';
import RankingMarketer from './charts/partials/RankingMarketer';
import AnalitycsMarketer from './analytics/AnalitycsMarketer';
import Dashboard from '@/api/Dashboard';


const statistics = ref(null)
const fetching = ref(null)
const filters = ref(null)

const handleFilter = () => {
    fetching.value = true;
    Dashboard.statistics(filters.value)
        .then(res => {
            if (res.data.code == 'SUCCESS') {
                statistics.value = res.data.data.statistics;
                fetching.value = false;
            }
        })
}
handleFilter();

</script>

<style></style>