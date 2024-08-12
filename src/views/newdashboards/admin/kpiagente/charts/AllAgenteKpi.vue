<template>
  <div>
    <div v-if="!loading" class="tw-w-full tw-shadow-md tw-p-4 tw-bg-white tw-rounded-lg">
      <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center">
        <h1 class="tw-text-xl tw-font-medium tw-py-2">
          Total {{ selectedKpi === 'all' ? 'KPIs' : selectedKpi }} :
        </h1>
        <div class="tw-full md:tw-mb-0 tw-mb-3">
          <span v-if="selectedKpi !== 'all'" :style="{ backgroundColor: color }" class="tw-font-normal tw-text-white tw-px-2 tw-py-1 tw-rounded">
            Avg: {{ confirmationNumber }}
          </span>
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
const confirmationNumber = ref(0);
const color = ref();
const selectedKpi = ref('all'); // Default to all KPIs

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
  const categories = data.value.map(item => item.x);
  
  const { startDate, endDate } = props.filters.dateRange || {};
  const daysCount = startDate && endDate ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) : 7;

  if (startDate && endDate) {
    for (let day = new Date(startDate); day <= new Date(endDate); day.setDate(day.getDate() + 1)) {
      categories.push(new Date(day).getTime());
    }
  } else {
    const today = new Date();
    for (let i = daysCount; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      categories.push(new Date(day).getTime());
    }
  }

  return {
    series: selectedKpi.value === 'all' ? (options.value?.series || []) : [{
      name: selectedKpi.value,
      data: data.value || [],
      type: 'area',
      color: color.value || '#000000',
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
      categories: categories,
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
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          const agenteName = w.config.series[seriesIndex].data[dataPointIndex].agente; // Correct reference to the agente_fullname
          return `Count: ${value}<br>Agent: ${agenteName}`;
        },
        title: {
          formatter: () => '',
        },
      },
    },
    legend: {
      show: selectedKpi.value === 'all',
      position: 'top',
      horizontalAlign: 'left',
    },
  };
});

const getData = async (filters) => {
  loading.value = true;
  try {
    const res = await Dashboard.getAllAgenteKpis(filters);
    if (res.data.code === 'SUCCESS') {
      if (selectedKpi.value === 'all') {
        const combinedData = [];
        const seriesData = [];

        if (res.data.data && typeof res.data.data === 'object') {
          Object.keys(res.data.data).forEach((kpiKey) => {
            const kpiData = res.data.data[kpiKey]?.[kpiKey + 'ByDate'] || [];
            seriesData.push({
              name: kpiKey,
              data: kpiData.map(item => ({
                x: new Date(item.date).getTime(),
                y: item.count,
                agente: item.agente_fullname, // Ajouter le nom de l'agent ici
              })),
              type: 'area',
              color: res.data.data[kpiKey]?.card?.color || '#000000',
            });

            combinedData.push(...kpiData.map(item => ({
              x: new Date(item.date).getTime(),
              y: item.count,
              agente: item.agente_fullname, // Ajouter le nom de l'agent ici
            })));
          });

          data.value = combinedData;
          if (seriesData.length > 0) {
            options.value.series = seriesData;
          }
        }
      } else {
        const kpiData = res.data.data[selectedKpi.value];
        if (kpiData && kpiData[selectedKpi.value + 'ByDate']) {
          data.value = kpiData[selectedKpi.value + 'ByDate'].map(item => ({
            x: new Date(item.date).getTime(),
            y: item.count,
            agente: item.agente_fullname, // Ajouter le nom de l'agent ici
          }));
          confirmationNumber.value = kpiData.card.value;
          color.value = kpiData.card.color;
        } else {
          data.value = [];
          confirmationNumber.value = 0;
          color.value = '#000000';
        }
      }
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
    const filters = { startDate, endDate, selectedAgenteId };

    getData(filters);
  },
  { immediate: true }
);
</script>
