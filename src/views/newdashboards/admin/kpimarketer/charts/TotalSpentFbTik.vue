<template>
  <div>
      <div v-if="!loading" class="tw-w-full tw-shadow-md tw-p-4 tw-bg-white tw-rounded-lg">
       <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center">
        <h1 class="tw-text-xl tw-font-medium tw-py-2">Total Spend :</h1>
        <div class="tw-full md:tw-mb-0 tw-mb-3">
          <span class="tw-font-normal tw-bg-blue-800 tw-text-white tw-px-2 tw-py-1 tw-rounded">Avg FB: {{ fbAverage }}</span>
          <span class="tw-ml-2 tw-font-normal tw-bg-[#f60457] tw-text-white tw-px-2 tw-py-1 tw-rounded">Avg TK: {{ tiktokAverage }}</span>
        </div>
       </div>
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
  const cacheKey = `TotalSpentFbTik-${date_avant}-${date_apres}-${marketer_id}-${product_id}`;

  loading.value = true;
  await Dashboard.TotalSpendFbTik(date_avant, date_apres, marketer_id, product_id)
    .then(res => {
      if (res.data.code === 'SUCCESS') {
        const fbData = res.data.data.facebook.map(marketer => ({
          name: marketer.name,
          data: marketer.data.map(item => ({ x: item.date, y: item.amount })),
          source: 'facebook',
        }));

        const tkData = res.data.data.tiktok.map(marketer => ({
          name: marketer.name,
          data: marketer.data.map(item => ({ x: item.date, y: item.amount })),
          source: 'tiktok',
        }));

        globalFacebookAverage.value = res.data.data.globalFacebookAverage;
        globalTiktokAverage.value = res.data.data.globalTiktokAverage;
        const newData = [...fbData, ...tkData];

        localStorage.setItem(cacheKey, JSON.stringify({
          date_avant,
          date_apres,
          marketer_id,
          product_id,
          data: newData,
          globalFacebookAverage: globalFacebookAverage.value,
          globalTiktokAverage: globalTiktokAverage.value,
        }));
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
const fbAverage = computed(() => globalFacebookAverage.value.toFixed(2));
const tiktokAverage = computed(() => globalTiktokAverage.value.toFixed(2));
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
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
  };
});
</script>
