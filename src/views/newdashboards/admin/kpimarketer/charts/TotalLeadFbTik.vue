<template>
    <div>
        <div  v-if="!loading" class="tw-w-full tw-shadow-md tw-p-4 tw-bg-white tw-rounded-lg">
          <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Total Lead :</h1>
            <apexchart :height="300" :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class=" tw-h-[350px] tw-my-auto tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watch, defineProps } from 'vue';
  import Dashboard from '@/api/Dashboard';
  
  const data = ref([]);
  const globalTiktokAverage = ref(0); 
  const globalFacebookAverage = ref(0);
  const loading = ref(false);
  
  const props = defineProps({
    filters: {
      type: Object,
      default: () => ({
        dateRange: {
          startDate: null,
          endDate: null,
        },
        selectedMarketerId: null,
        selectedSeries: null,
      }),
    },
  });
  
  const getData = async (date_avant = null, date_apres = null, marketer_id = null, product_id = null) => {
  const cacheKey = `TotalLeadFbTik-${date_avant}-${date_apres}-${marketer_id}-${product_id}`;

  loading.value = true;
  await Dashboard.TotalLeadFbTik(date_avant, date_apres, marketer_id, product_id)
    .then(res => {
      if (res.data.code === 'SUCCESS') {
        const fbData = res.data.data.facebook.map(marketer => ({
          name: marketer.name,
          data: marketer.data.map(item => ({ x: item.date, y: item.leads })),
          source: 'facebook',
        }));

        const tkData = res.data.data.tiktok.map(marketer => ({
          name: marketer.name,
          data: marketer.data.map(item => ({ x: item.date, y: item.leads })),
          source: 'tiktok',
        }));

        globalFacebookAverage.value = res.data.data.globalFacebookAverage;
        globalTiktokAverage.value = res.data.data.globalTiktokAverage;
        const newData = [...fbData, ...tkData];

        const cachedData = JSON.parse(localStorage.getItem(cacheKey));
        if (!cachedData || JSON.stringify(cachedData.data) !== JSON.stringify(newData)) {
          localStorage.setItem(cacheKey, JSON.stringify({
            date_avant,
            date_apres,
            marketer_id,
            product_id,
            data: newData,
            globalFacebookAverage: globalFacebookAverage.value,
            globalTiktokAverage: globalTiktokAverage.value,
          }));
        }
        data.value = newData;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
  
  watch(
    () => props.filters,
    (newFilters) => {
      const { dateRange, filter } = newFilters || {};
      const { startDate, endDate } = dateRange || {};
      const { selectedMarketerId, selectedSeries } = filter || {};
      getData(startDate, endDate, selectedMarketerId, selectedSeries);
    },
    { immediate: true }
  );
  var options = computed(() => { 
    const combinedData = data.value;
    return {
      series: combinedData.map(i => ({
        name: `${i.name} (${i.source})`,
        data: i.data,
        type: i.source === 'facebook' ? 'area' : 'area',
        color: i.source === 'facebook' ? '#4267B2' : '#f60457',
        fill: {
          type: i.source === 'facebook' ? 'solid' : 'solid',
        },
      })),
      chart: {
        type: 'area',
      },
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function(value, timestamp) {
            return new Date(timestamp).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
          }
        },
        categories: combinedData.length > 0 ? combinedData[0].data.map(c => new Date(c.x).getTime()) : [],
      },
      theme: {
        palette: 'palette4',
      },
      stroke: {
        curve: 'smooth',
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (value, { seriesIndex, dataPointIndex }) {
            let marketerValue = parseFloat(combinedData[seriesIndex].data[dataPointIndex].y).toFixed(2);
            let marketerName = combinedData[seriesIndex].name;
            let marketerSource = combinedData[seriesIndex].source;
            let total = combinedData[seriesIndex].data.reduce((a, b) => a + parseFloat(b.y), 0).toFixed(2);
            return `${marketerName} (${marketerSource}): ${marketerValue}, Total: ${total}`;
          },
          title: {
            formatter: () => '',
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: globalFacebookAverage.value,
            borderColor: '#EBEBEB',
            borderWidth: 2,
            borderStyle: 'solid',
            label: {
              borderColor: '#fff',
              style: {
                color: '#fff',
                background: '#4267B2',
                fontSize: '15px',
                fontWeight: '400',
              },
              text: `Facebook Average: ${globalFacebookAverage.value.toFixed(2)}`,
            },
          },
          {
            y: globalTiktokAverage.value,
            borderColor: '#EBEBEB',
            borderWidth: 2,
            borderStyle: 'solid',
            label: {
              borderColor: '#fff',
              style: {
                color: '#fff',
                background: '#f60457',
                fontSize: '15px',
                fontWeight: '400',
              },
              text: `TikTok Average: ${globalTiktokAverage.value.toFixed(2)}`,
            },
          },
        ],
      },
      legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
      },
    };
  });
  </script>
  