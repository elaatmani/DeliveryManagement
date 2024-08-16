<template>
    <div v-if="loading" class="tw-bg-white tw-p-2 tw-w-fit tw-my-2 tw-rounded-lg tw-h-[300px]">
      <div class="tw-flex tw-items-center tw-gap-2">
        <p class="tw-p-2 tw-font-bold tw-text-lg">Confirmation</p>
        <p class="tw-px-1 tw-bg-emerald-400 tw-text-white tw-text-sm tw-rounded">
          <icon icon="eos-icons:three-dots-loading" class="tw-text-xl" />
        </p>
      </div>
  
      <div class="tw-flex tw-gap-x">
        <div class="tw-w-[250px] tw-p-5 tw-h-[230px] tw-flex tw-items-center tw-justify-center">
          <div class="tw-w-[75%] tw-p-2 tw-bg-gray-100 tw-rounded-full tw-aspect-square tw-animate-pulse"></div>
        </div>
      </div>
    </div>
    <div v-else class="tw-bg-white tw-w-fit tw-my-2 tw-rounded-lg tw-p-2 tw-h-[300px]">
      <div class="tw-flex tw-items-center tw-gap-2">
        <p class="tw-p-2 tw-font-bold tw-text-lg">Confirmation</p>
        <p class="tw-px-1 tw-bg-emerald-400 tw-text-white tw-text-sm tw-rounded">
          {{ new Intl.NumberFormat().format(totalConfirmed) }}
        </p>
      </div>
      <div class="tw-flex tw-gap-2">
        <div class="tw-w-fit tw-flex tw-items-center tw-h-full">
          <apexchart type="radialBar" height="230" width="230" :options="options" :series="series"></apexchart>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, watch } from "vue";
  import Analytics from "@/api/Analytics";
  
  const props = defineProps({
    filters: {
      type: Object,
      default: () => ({}),
    },
  });
  
  const loading = ref(true);
  const totalConfirmed = ref(0);
  const series = ref([77]);
  
  const options = computed(() => ({
    chart: {
      type: "radialBar",
      toolbar: { show: false },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -1,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#111",
            fontSize: "16px",
            fontFamily: "cairo",
            fontWeight: "medium",
          },
          value: {
            formatter: function (val) {
              return parseInt(val) + "%";
            },
            color: "#111",
            fontSize: "25px",
            fontFamily: "cairo",
            fontWeight: "bold",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      colors: series.value[0] > 50 ? ["#10b981"] : ["#f43f5e"],
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: series.value[0] > 50 ? ["#22c55e", "#10b981"] : ["#f43f5e", "#e11d48"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Confirmed"],
  }));
  
  const getData = async () => {
    console.log("getData called");
    loading.value = true;
    const { treated_from, treated_to } = props.filters || {};
  
    try {
      const res = await Analytics.getChartConfirmation({
        treated_from,
        treated_to,
      });
  
      if (res.status === 200 && res.data && res.data.data) {
        totalConfirmed.value = res.data.data.total;
        series.value[0] = res.data.data.rate;
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while fetching data. Please try again.");
    } finally {
      loading.value = false;
    }
  };
  
  watch(
    () => props.filters,
    (newFilters) => {
      console.log("New filters in ConfirmationChart:", newFilters);
      getData();
    },
    { deep: true }
  );
  </script>
  