<template>
    <div class="tw-mb-4 tw-flex tw-justify-between tw-items-center">
        <div class="tw-hidden md:tw-block">

            <h2 class="tw-text-lg tw-font-semibold">Overview</h2>
            <p class="tw-text-sm">Here is a quick overview of your cash flow</p>
        </div>
        
        <FilterContainer />
    </div>

    <div class="tw-grid tw-grid-cols-12 tw-gap-4">
        <div class="tw-col-span-12 md:tw-col-span-8 tw-border tw-border-solid tw-border-gray-200">
            <MonthlyCashFlowChart />
        </div>

        

        <div class="tw-col-span-12 md:tw-col-span-4 tw-flex tw-flex-col tw-gap-4">
            <div class="tw-flex-1 tw-border tw-border-solid tw-border-gray-200">
                <LifetimeBalance />
            </div>
            <div class="tw-flex-1 tw-border tw-border-solid tw-border-gray-200">
                <BalanceBox />
            </div>
        </div>


        <div class="tw-col-span-12 md:tw-col-span-6 tw-border tw-border-solid tw-border-gray-200">
            <CashFlowChart />
        </div>


        <div class="tw-col-span-12 md:tw-col-span-3 tw-border tw-border-solid tw-border-gray-200">
            <CategoryIncomeChart />
        </div>

        <div class="tw-col-span-12 md:tw-col-span-3 tw-border tw-border-solid tw-border-gray-200">
            <CategoryExpensesChart />
        </div>

    </div>


    <div class="">
    </div>
</template>

<script setup>
import CashFlowChart from './partials/charts/CashFlowChart.vue';
import MonthlyCashFlowChart from './partials/charts/MonthlyCashFlowChart';
import CategoryIncomeChart from './partials/charts/CategoryIncomeChart.vue';
import CategoryExpensesChart from './partials/charts/CategoryExpensesChart.vue';
import BalanceBox from './partials/BalanceBox.vue';
import LifetimeBalance from './partials/LifetimeBalance.vue';
import FilterContainer from './partials/filters/FilterContainer.vue';
import { ref, provide } from 'vue';

const filters = ref({
    date: 'last_7_days',
    users_ids: [],
    categories: [],
    count: 0
});

provide('filters', filters);

</script>

<style>

</style>