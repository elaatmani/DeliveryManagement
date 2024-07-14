<template>
  <div>
    <GeneralFilter @filter-changed="handleFilterChange" />
    <div class="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TotalSpentFbTik :filters="filters"/>
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TotalLeadFbTik :filters="filters"/>
      </div>
    </div>
    <div class="tw-flex tw-my-2 tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <AmountPerLeadFbTik :filters="filters"/>
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TopProductLeadCost :filters="filters"/>
      </div>
    </div>
    <div class="tw-w-full md:tw-w-full tw-shadow-md tw-rounded-lg">
      <TopMarketer :filters="filters"/>
    </div>
  </div>
</template>

<script setup>
import TotalLeadFbTik from '@/views/newdashboards/admin/kpimarketer/charts/TotalLeadFbTik.vue'
import TopMarketer from '@/views/newdashboards/admin/kpimarketer/charts/TopMarketer.vue'
import TopProductLeadCost from '@/views/newdashboards/admin/kpimarketer/charts/TopProductLeadCost.vue'
import AmountPerLeadFbTik from '@/views/newdashboards/admin/kpimarketer/charts/AmountPerLeadFbTik.vue'
import TotalSpentFbTik from '@/views/newdashboards/admin/kpimarketer/charts/TotalSpentFbTik.vue'
import GeneralFilter from '@/views/newdashboards/admin/kpimarketer/filters/GeneralFilter.vue'
import { ref } from 'vue';

const filters = ref({});

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
};
</script>
