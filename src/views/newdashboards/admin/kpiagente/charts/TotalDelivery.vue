<template>
  <div>
    <div v-if="!loading" class="tw-w-full tw-shadow-md tw-p-4 tw-bg-white tw-rounded-lg">
      <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center">
        <h1 class="tw-text-xl tw-font-medium tw-py-2">Total Delivery :</h1>
        <div class="tw-full md:tw-mb-0 tw-mb-3">
          <span :style="{ backgroundColor: color }" class="tw-font-normal tw-text-white tw-px-2 tw-py-1 tw-rounded">Avg: {{
            confirmationNumber }}</span>
        </div>
      </div>
      <apexchart :options="options" :chart="options.chart" :series="options.series"></apexchart>
    </div>
    <div v-else class="tw-h-[350px] tw-my-auto tw-flex tw-items-center tw-justify-center">
      <Loading />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, defineProps } from 'vue';
import Dashboard from '@/api/Dashboard';

const loading = ref(true);
const data = ref([]);
const color = ref();
const confirmationNumber = ref(0);
const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      dateRange: {
        startDate: null,
        endDate: null,
      },
      selectedAgenteId: null,
      selectedSeries: null,
    }),
  },
});

const options = computed(() => {
  const combinedData = data.value.map(item => ({
    x: item.x, // Should be a timestamp (number)
    y: item.y  // Should be a number (count)
  }));

  // Initialize categories array
  const categories = combinedData.map(item => item.x);

  const { startDate, endDate } = props.filters.dateRange || {};
  const daysCount = startDate && endDate ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) : 7;

  if (startDate && endDate) {
    for (let day = new Date(startDate); day <= new Date(endDate); day.setDate(day.getDate() + 1)) {
      categories.push(new Date(day).getTime()); // Push numeric timestamp
    }
  } else {
    const today = new Date();
    for (let i = daysCount; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      categories.push(new Date(day).getTime()); // Push numeric timestamp
    }
  }

  return {
    series: [{
      name: 'Confirmation',
      data: combinedData,
      type: 'area',
      color: color.value || '#000000', // Ensure color is valid
      fill: {
        type: 'solid',
      },
    }],
    chart: {
      type: 'area',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value, timestamp) {
          return new Date(timestamp).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      },
      categories: categories, // Ensure this is an array of numbers
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
        formatter: function (value) {
          return `Count: ${value}`;
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



const getData = async (filters) => {
  loading.value = true;
  try {
    const res = await Dashboard.DeliveredOrders(filters);
    if (res.data.code === 'SUCCESS') {
      const rawData = res.data.data.deliveredOrdersByDate;
      console.log('Raw Data:', rawData);

      data.value = rawData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.count
      }));

      confirmationNumber.value = res.data.data.card.value;
      color.value = res.data.data.card.color;
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
        const { selectedAgenteId } = filter || {};
        const filters = { startDate, endDate, selectedAgenteId};

        getData(filters);
    },
    { immediate: true }
);
</script>
