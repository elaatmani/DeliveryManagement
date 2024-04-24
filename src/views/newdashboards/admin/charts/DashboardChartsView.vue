<template>
    <div>
      <div class="tw-gap-2">
          <div class="tw-mb-2">
              <StatusDonutChart />
          </div>
          <div class="tw-mb-2 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostForMarketer />
          </div>
          <div class="tw-mb-2 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostPerLead />
          </div>
          <div class="tw-mb-2 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostPerProduct />
          </div>
          <div class=" tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <TopProductChart />
          </div>
         
      </div>
    </div>
  </template>
  
  <script setup>
  import TopProductChart from './partials/TopProductChart';
  import CostPerProduct from './partials/CostPerProduct';
  import CostPerLead from './partials/CostPerLead';
  import CostForMarketer from './partials/CostForMarketer';
  import StatusDonutChart from './partials/StatusDonutChart';

  
  </script>
  
  <style>
  
  </style>