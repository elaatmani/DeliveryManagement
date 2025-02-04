<template>
    <div class="tw-bg-white tw-p-4 tw-h-full">
      <h2 class="tw-text-lg tw-font-semibold tw-mb-2">Cash Flow</h2>
      <!-- Skeleton Loader (Shows while loading) -->
      <div v-if="loading" class="tw-w-full tw-h-[265px] tw-relative tw-flex tw-items-end tw-gap-2 tw-px-6 tw-pb-6">
        <div
          v-for="i in 28"
          :key="i"
          class="tw-bg-gray-200 tw-rounded-md tw-animate-pulse"
          :style="{ height: `${randomHeight()}%`, width: '3%' }"
        ></div>
      </div>
      <apexchart v-if="!loading"
        type="bar" 
        height="250"
        :options="chartOptions" 
        :series="series" 
        class="tw-w-full" 
      />
    </div>
  </template>
  
  <script setup>
  import CashFlowDashboard from "@/api/CashFlowDashboard";
  import moment from "moment";
import { ref, inject, watch } from "vue";
  
  const loading = ref(true);
  const filters = inject('filters');

  watch(() => filters.value.count, (newv, oldv) => {
    if(newv != oldv) {
      getData();
    }
  });

  const series = ref([
    {
      name: "Balance Out",
      data: [600, 400, 300, 500, 200, 400, 500, 450, 460, 430, 400, 350],
      color: "#000000", // Black
    },
    {
      name: "Balance In",
      data: [700, 800, 350, 650, 250, 600, 650, 800, 700, 650, 600, 550],
      color: "#FFA500", // Orange
    },
  ]);

  const randomHeight = () => Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  
  const chartOptions = ref({
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%" },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      title: { text: "Date" },
    },
    yaxis: { title: { text: "Amount $" } },
    legend: { position: "top" },
  });

  const getData = async () => {
    loading.value = true;

    await CashFlowDashboard.dailyCashflows(filters.value)
      .then((res) => {
        if(res.data.code == 'SUCCESS') {
          chartOptions.value.xaxis.categories = res.data.data.map((item) => moment(item.date).format('MMM D'));
          series.value[0].data = res.data.data.map((item) => item.spent.expenses);
          series.value[1].data = res.data.data.map((item) => item.spent.income);
          
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
    loading.value = false;
    // Fetch data from API
  };

  getData();
  </script>
  
  <style scoped>
  /* Tailwind styles are already applied via tw- prefixes */
  </style>
  