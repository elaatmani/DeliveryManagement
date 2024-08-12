<template>
  <div>
    <GeneralFilter @filter-changed="handleFilterChange" />
    <CardsStats :filters="filters" />
    <div class="tw-flex tw-my-2 tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <AllAgenteKpi :filters="filters" />
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TopAgentes :filters="filters" />
      </div>
    </div>
    <div class="tw-flex tw-my-2 tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TotalHandledAndTreated :filters="filters" />
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TotalDropped :filters="filters" />
      </div>
    </div>
    <div class="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-w-full tw-space-y-2 md:tw-space-y-0 md:tw-space-x-4">
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
        <TotalConfirmation :filters="filters" />
      </div>
      <div class="tw-w-full md:tw-w-1/2 tw-shadow-md tw-rounded-lg">
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

const filters = ref({});

const handleFilterChange = (newFilters) => {
  filters.value = newFilters;
};
</script>
