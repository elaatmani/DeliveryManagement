<template>
    <div class="tw-flex tw-flex-col">
      <div v-if="!loading" class="tw-w-full tw-shadow-md tw-p-4 tw-bg-white tw-rounded-lg">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Top Products :</h1>

        <apexchart :height="300" :series="options.series" :chart="options.chart" :options="options"></apexchart>
        <div class="tw-w-full tw-flex tw-justify-end">
          <button
            class="tw-border-solid tw-border-2 tw-border-gray-400 tw-py-1 tw-px-3 tw-mr-2"
            @click="prevProduct"
            :disabled="currentIndex === 0"
          >
            Previous
          </button>
          <button
            class="tw-border-solid tw-border-2 tw-border-gray-400 tw-py-1 tw-px-3"
            @click="nextProduct"
            :disabled="currentIndex >= data.length - 5"
          >
            Next
          </button>
        </div>
      </div>
      <div v-else class="tw-h-[350px] tw-my-auto tw-flex tw-items-center tw-justify-center">
        <Loading />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watch, defineProps } from 'vue';
  import Dashboard from '@/api/Dashboard';
  
  const data = ref([]);
  const loading = ref(false);
  const currentIndex = ref(0);
  
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
    loading.value = true;
    try {
      const res = await Dashboard.topMarketersByLeadsAndCost(date_avant, date_apres, marketer_id, product_id);
      if (res.data.code === 'SUCCESS') {
        data.value = res.data.data;
        currentIndex.value = 0; // Reset currentIndex when new data is loaded
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
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
  
  const nextProduct = () => {
    if (data.value && currentIndex.value < data.value.length - 5) {
      currentIndex.value += 5;
    }
  };
  
  const prevProduct = () => {
    if (currentIndex.value > 0) {
      currentIndex.value -= 5;
    }
  };
  
  const options = computed(() => {
  const totalLeadsData = data.value ? data.value.slice(currentIndex.value, currentIndex.value + 5).map(marketer => Number(parseFloat(marketer.total_leads).toFixed(2))) : [];
  const costPerLeadData = data.value ? data.value.slice(currentIndex.value, currentIndex.value + 5).map(marketer => Number(parseFloat(marketer.cost_per_lead).toFixed(2))) : [];

  console.log("Total Leads Data:", totalLeadsData);
  console.log("Cost Per Lead Data:", costPerLeadData);

  return {
    series: [
      {
        name: 'Total Leads',
        type: 'bar',
        data: totalLeadsData,
      },
      {
        name: 'Cost Per Lead',
        type: 'bar',
        data: costPerLeadData,
      },
    ],
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2); // Ensure every value is displayed with two decimal places
      },
      style: {
        colors: ['#fff'],
      },
      background: {
        enabled: true,
        foreColor: '#000',
        borderRadius: 2,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      }
    },
    stroke: {
      width: [0, 0], // Set to 0 if no stroke is needed on bars
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: data.value ? data.value.slice(currentIndex.value, currentIndex.value + 5).map(marketer => marketer.name) : [],
    },
    yaxis: [
      {
        title: {
          text: 'Total Leads',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Cost Per Lead',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2); // Format tooltips to two decimal places as well
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#37C8EB', '#E337EB'],
  };
});




  </script>
  