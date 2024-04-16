<template>
    <div>
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <StatusDonutChart :chart-data="dataDonuts" :loading="loading"  />
          </div>
          <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostForMarketer :chart-data="dataCostPerMarketer" :loading="loading"/>
          </div>
          <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostPerProduct :chart-data="dataCostPerProduct" :loading="loading"   />
          </div>
         
      </div>
    </div>
  </template>
  
  <script setup>
  import CostPerProduct from './partials/CostPerProduct';
  import CostForMarketer from './partials/CostForMarketer';
  import StatusDonutChart from './partials/StatusDonutChart';
  import Dashboard from '@/api/Dashboard';
  import { ref,defineExpose } from 'vue';



    const dataDonuts = ref([]);
    const dataCostPerProduct = ref([]);
    const dataCostPerMarketer = ref([]);
    const loading = ref(true);
    defineExpose({
        dataDonuts,
        dataCostPerProduct,
        dataCostPerMarketer,
        loading
        });
    const getData = async () => {
    loading.value = true;
    await Dashboard.AllCharts()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                dataDonuts.value = res.data.data.confirmation_state_donuts[0];
                dataCostPerProduct.value = res.data.data.cost_per_product;
                dataCostPerMarketer.value = res.data.data.cost_per_marketer;


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