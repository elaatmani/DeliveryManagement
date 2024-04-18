<template>
    <div>
      <div class="tw-grid tw-grid-cols-12 tw-gap-2">
          <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <StatusDonutChart />
          </div>
          <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostForMarketer />
          </div>
          <div class="tw-col-span-12 tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200">
              <CostPerProduct />
          </div>
         
      </div>
    </div>
  </template>
  
  <script setup>
  import CostPerProduct from './partials/CostPerProduct';
  import CostForMarketer from './partials/CostForMarketer';
  import StatusDonutChart from './partials/StatusDonutChart';

  
  </script>
  
  <style>
  
  </style>