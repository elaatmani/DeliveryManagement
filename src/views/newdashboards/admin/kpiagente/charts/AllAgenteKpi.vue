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
  const categories = [];
  const seriesData = {};

  if (data.value.length > 0) {
    data.value.forEach((item) => {
      if (!categories.includes(item.agente)) {
        categories.push(item.agente);
      }

      if (!seriesData[item.status]) {
        seriesData[item.status] = [];
      }

      const agentData = seriesData[item.status].find((d) => d.name === item.agente);
      if (agentData) {
        agentData.data.push(item.count);
      } else {
        seriesData[item.status].push({
          name: item.agente,
          data: [item.count],
          color: item.color,
        });
      }
    });
  }

  const series = Object.keys(seriesData).map((status) => ({
    name: status,
    data: seriesData[status].map((d) => d.data[0]),
    color: seriesData[status][0]?.color || '#000000',
  }));

  return {
    series,
    chart: {
      type: 'bar',
      stacked: true,
    },
    xaxis: {
      categories,
      title: {
        text: 'Agente',
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
      },
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return `Count: ${value}`;
        },
      },
    },
    legend: {
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
      const combinedData = [];
      if (res.data.data && typeof res.data.data === 'object') {
        Object.keys(res.data.data).forEach((kpiKey) => {
          const kpiData = res.data.data[kpiKey]?.[kpiKey + 'ByDate'] || [];
          kpiData.forEach((item) => {
            combinedData.push({
              agente: item.agente_fullname,
              count: item.count,
              status: kpiKey,
              color: res.data.data[kpiKey]?.card?.color || '#000000',
            });
          });
        });

        data.value = combinedData;
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
