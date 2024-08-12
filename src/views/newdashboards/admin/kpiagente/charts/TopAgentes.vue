<template>
  <div>
    <div v-if="!loading" class="tw-w-full tw-shadow-md tw-p-4 tw-bg-white tw-rounded-lg">
      <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center">
        <h1 class="tw-text-xl tw-font-medium tw-py-2">
          Top Agents for Confirmations:
        </h1>
      </div>
      <apexchart :options="options" :chart="options.chart" :series="options.series"></apexchart>
    </div>
    <div v-else class="tw-h-[350px] tw-my-auto tw-flex tw-items-center tw-justify-center">
      <Loading />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps } from 'vue';
import Dashboard from '@/api/Dashboard';  // Ensure this path matches your project structure

const loading = ref(true);
const data = ref([]);

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      dateRange: {
        startDate: null,
        endDate: null,
      },
      selectedAgenteId: null,
    }),
  },
});

const options = computed(() => {
  return {
    series: [{
      name: 'Confirmations',
      data: data.value.map(item => item.confirmed_count), // Extract confirmation counts
      type: 'bar', // Bar chart for better visualization of agents' confirmations
      color: '#06b6d4', // Set a consistent color for confirmations
    }],
    chart: {
      type: 'bar',
    },
    xaxis: {
      type: 'category',
      categories: data.value.map(item => item.agente_name || item.agente_id), // Use agent names or IDs as categories
    },
    yaxis: {
      title: {
        text: 'Confirmations',
      },
    },
    theme: {
      palette: 'palette4',
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `Confirmations: ${value}`;
        },
      },
    },
    legend: {
      show: false,
    },
  };
});

const getData = async (filters) => {
  loading.value = true;
  try {
    const res = await Dashboard.TopAgentes(filters);
    if (res.data.code === 'SUCCESS') {
      data.value = res.data.data.map(item => ({
        agente_id: item.agente_id,
        agente_name: item.user.firstname + ' ' + item.user.lastname,
        confirmed_count: item.confirmed_count,
      }));
    } else {
      data.value = [];
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
