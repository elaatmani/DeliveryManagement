<template>
    <div class="tw-flex">
      <div class="tw-p-5 tw-w-full tw-relative">
        <div class="tw-flex tw-justify-between">
            <h1 class="tw-text-xl tw-font-medium tw-py-2">Sources</h1>
            <div v-if="loadingUpdating" class="tw-flex tw-text-neutral-500 tw-items-center tw-gap-1 tw-absolute tw-top-2 tw-right-3">
                <Loading class="tw-scale-50" />
                <p class=" tw-tetx-xs">Updating</p>
            </div>
            </div>
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
  const loadingUpdating = ref(true);

  
  
  const getData = async () => {
        const cachedData = sessionStorage.getItem('cachedstatusdonutmarketer');
        let parsedData = null;

        if (cachedData) {
            parsedData = JSON.parse(cachedData);
            data.value = parsedData.confirmation_state_donuts;
            loading.value = false;
        }
      await Dashboard.ConfirmationStatesDonuts()
      .then(
          res => {
              if(res.data.code == 'SUCCESS') {
                const newData = {
                    confirmation_state_donuts: res.data.data.confirmation_state_donuts[0]
                };

                if (!parsedData || JSON.stringify(parsedData.confirmation_state_donuts) !== JSON.stringify(newData.confirmation_state_donuts)) {
                    sessionStorage.setItem('cachedstatusdonutmarketer', JSON.stringify(newData));
                    data.value = res.data.data.confirmation_state_donuts[0];
                  
                    loadingUpdating.value = true
                } else {
            
                    loadingUpdating.value = false;

                }
                loadingUpdating.value = false

                loading.value = false;
              }
          }
      );
  }
  
  getData();

  var options = computed(() => loading.value ? null : ({
      series: data.value.source_for_marketer.map(i => i.total),
      chart: {
          type: 'donut',
      },
      legend: {
          position: 'top',
          horizontalAlign: 'left'
      },
      labels: data.value.source_for_marketer.map(j => j.source)
  }));
  </script>
  
  <style></style>