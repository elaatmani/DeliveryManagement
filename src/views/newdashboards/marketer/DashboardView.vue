<template>
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12">
          <AnalitycsMarketer :statistics="statistics" :fetching="fetching"/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <CostPerDay/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <LeadsChart/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <AmountPerLead/>
        </div>
       
    </div>
    </template>

<script setup>
import AmountPerLead from './charts/partials/AmountPerLead';
import LeadsChart from './charts/partials/LeadsChart';
import {ref} from 'vue'
import CostPerDay from './charts/partials/CostPerDay';
import AnalitycsMarketer from './analytics/AnalitycsMarketer';
import Dashboard from '@/api/Dashboard';


const statistics = ref(null)
const fetching = ref(null)
const filters = ref(null)

const handleFilter=()=> {
            fetching.value = true;
            Dashboard.statistics(filters.value)
            .then(res => {
                if(res.data.code == 'SUCCESS') {
                    statistics.value = res.data.data.statistics;
                    fetching.value = false;
                }
            })
}
handleFilter();
        
  </script>

<style>

</style>