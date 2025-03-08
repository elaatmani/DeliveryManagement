<template>  
  <div>
    <GeneralFilter @filter-changed="handleFilterChange" />
    <CardsStats :filters="filters" />
    <div class="tw-p-2x tw-bg-whitex tw-borderx tw-border-solidx tw-border-gray-200x">
      <AgentPerformanceTable />
    </div>

    <div class="tw-flex tw-my-2 tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-mdx tw-rounded-lgx tw-border tw-border-solid tw-border-gray-200">
        <AllAgenteKpi :filters="filters" />
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-mdx tw-rounded-lgx tw-border tw-border-solid tw-border-gray-200">
        <TopAgentes :filters="filters" />
      </div>
    </div>
    <div class="tw-flex tw-my-2 tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-mdx tw-rounded-lgx tw-border tw-border-solid tw-border-gray-200">
        <TotalHandledAndTreated :filters="filters" />
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-mdx tw-rounded-lgx tw-border tw-border-solid tw-border-gray-200">
        <TotalDropped :filters="filters" />
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-mdx tw-rounded-lgx tw-border tw-border-solid tw-border-gray-200">
        <TotalConfirmation :filters="filters" />
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-mdx tw-rounded-lgx tw-border tw-border-solid tw-border-gray-200">
        <TotalDelivery :filters="filters" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardsStats from '@/views/newdashboards/admin/kpiagente/cards/CardsStats.vue'
import TotalConfirmation from '@/views/newdashboards/admin/kpiagente/charts/TotalConfirmation.vue'
import TotalDelivery from '@/views/newdashboards/admin/kpiagente/charts/TotalDelivery.vue'
import TotalHandledAndTreated from '@/views/newdashboards/admin/kpiagente/charts/TotalHandledAndTreated.vue'
import TotalDropped from '@/views/newdashboards/admin/kpiagente/charts/TotalDropped.vue'
import AllAgenteKpi from '@/views/newdashboards/admin/kpiagente/charts/AllAgenteKpi.vue'
import GeneralFilter from '@/views/newdashboards/admin/kpiagente/filters/GeneralFilter.vue'
import { ref } from 'vue';
import TopAgentes from './charts/TopAgentes.vue'
import AgentPerformanceTable from './performance/AgentPerformanceTable.vue'

const filters = ref({});

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
};
</script>
