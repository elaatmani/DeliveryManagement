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
      const res = await Dashboard.TotalCostAndLeadPerProduct(date_avant, date_apres, marketer_id, product_id);
      if (res.data.code === 'SUCCESS') {
        const newData = {
          date_avant,
          date_apres,
          marketer_id,
          product_id,
          data: res.data.data,
        };
  
        // sessionStorage.setItem('amountandleadproduct', JSON.stringify(newData));
        data.value = newData.data;
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
    return {
      series: [
          {
            name: 'Total Spend',
            data: data.value ? data.value.slice(currentIndex.value, currentIndex.value + 5).map(product => parseFloat(product.total_cost).toFixed(2)) : [],
          },
          {
            name: 'Total Leads',
            data: data.value ? data.value.slice(currentIndex.value, currentIndex.value + 5).map(product => parseFloat(product.total_leads).toFixed(2)) : [],
          },
      ],
      chart: {
        type: 'bar',
      },
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [0, 100],
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: 'category',
        categories: data.value ? data.value.slice(currentIndex.value, currentIndex.value + 5).map(product => product.product_name) : [],
      },
      stroke: {
        curve: 'smooth',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      colors: ['#EB3737', '#37C8EB'], // Red for cost, Cyan for leads
    };
  });
  </script>
  