<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12 lg:tw-col-span-6 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <WinningProductsChart />
        </div>
        <div class="tw-p-16 tw-col-span-6 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">

        </div>
    </div>
  </div>
</template>

<script setup>
import WinningProductsChart from './partials/WinningProductsChart.vue';

</script>

<style>

</style>