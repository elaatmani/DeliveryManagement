<template>
  <div>
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <ProductPerformanceByConfirmation />
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
            <ProductPerformanceByDelivery />
        </div>
    </div>
  </div>
</template>

<script setup>
import ProductPerformanceByConfirmation from './partials/ProductPerformanceByConfirmation';
import ProductPerformanceByDelivery from './partials/ProductPerformanceByDelivery';

</script>

<style>

</style>