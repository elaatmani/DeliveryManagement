<template>
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <AnalitycsMarketer/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <CostPerDay/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <LeadsChart/>
        </div>
       
    </div>
    </template>

<script setup>
import LeadsChart from './charts/partials/LeadsChart';
import CostPerDay from './charts/partials/CostPerDay';
import AnalitycsMarketer from './analytics/AnalitycsMarketer';

</script>

<style>

</style>