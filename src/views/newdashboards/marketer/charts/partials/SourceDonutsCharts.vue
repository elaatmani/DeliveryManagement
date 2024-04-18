<template>
    <div class="tw-flex">
      <div class="tw-p-5 tw-w-full">
          <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Sources</h1>
  
          <div v-if="!loading">
              <apexchart :height="400" :series="options.series" :chart="options.chart" :options="options"></apexchart>
          </div>
          <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
              <Loading />
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Dashboard from '@/api/Dashboard';
  import { computed, ref } from 'vue';
  
  
  
  const data = ref([]);
  const loading = ref(true);
  
  
  const getData = async () => {
      loading.value = true;
      await Dashboard.ConfirmationStatesDonuts()
      .then(
          res => {
              if(res.data.code == 'SUCCESS') {
                  data.value = res.data.data.confirmation_state_donuts[0];
                  loading.value = false;
              }
          }
      );
      loading.value = false;
  }
  
  getData();

  var options = computed(() => loading.value ? null : ({
      series: data.value.source_for_marketer.map(i => i.total),
      chart: {
          type: 'donut',
      },
  
      fill: {
          opacity: 1,
      },
      // colors: ['#22c55e', '#f43f5e'],
      legend: {
          position: 'top',
          horizontalAlign: 'left'
      },
      labels: data.value.source_for_marketer.map(j => j.source)
  }));
  </script>
  
  <style></style>