<template>
    <div class="tw-grid tw-grid-cols-12 tw-gap-2">
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <AnalitycsMarketer/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <CostPerDay :chart-data="dataCostPerDay" :loading="loading"/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <LeadsChart :chart-data="dataLeadsPerDay" :loading="loading"/>
        </div>
        <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
          <AmountPerLead :chart-data="dataLeadsPerAmount" :loading="loading"/>
        </div>
       
    </div>
    </template>

<script setup>
import AmountPerLead from './charts/partials/AmountPerLead';
import LeadsChart from './charts/partials/LeadsChart';
import CostPerDay from './charts/partials/CostPerDay';
import AnalitycsMarketer from './analytics/AnalitycsMarketer';

import Dashboard from '@/api/Dashboard';
  import { ref,defineExpose } from 'vue';



    const dataCostPerDay = ref([]);
    const dataLeadsPerDay = ref([]);
    const dataLeadsPerAmount = ref([]);
    const loading = ref(true);
    defineExpose({
        dataCostPerDay,
        dataLeadsPerDay,
        dataLeadsPerAmount,
        loading
        });
    const getData = async () => {
    loading.value = true;
    await Dashboard.AllCharts()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                dataLeadsPerAmount.value = res.data.data.amount_per_lead;
                dataCostPerDay.value = res.data.data.cost_per_day;
                dataLeadsPerDay.value = res.data.data.leads_per_day;


                loading.value = false;
            }
        }
    );
    loading.value = false;
    }

    getData();
</script>

<style>

</style>