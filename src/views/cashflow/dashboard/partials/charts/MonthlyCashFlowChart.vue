<template>
    <div class="tw-bg-white tw-p-4 tw-h-full">
        <h2 class="tw-text-lg tw-font-semibold tw-mb-2">Monthly Cash Flow</h2>
        <!-- Skeleton Loader (Shows while loading) -->
        <div v-if="loading" class="tw-w-full tw-h-[265px] tw-relative tw-flex tw-items-end tw-gap-2 tw-px-6 tw-pb-6">
            <div v-for="i in 12" :key="i" class="tw-bg-gray-200 tw-rounded-md tw-animate-pulse"
                :style="{ height: `${randomHeight()}%`, width: '7%' }"></div>
        </div>
        <apexchart v-if="!loading" type="bar" height="250" :options="chartOptions" :series="series" class="tw-w-full" />
    </div>
</template>

<script setup>
import CashFlowDashboard from "@/api/CashFlowDashboard";
import { ref, inject, watch } from "vue";

const loading = ref(true);
const filters = inject("filters");

watch(
    () => filters.value.count,
    (newv, oldv) => {
        if (newv != oldv) {
            getData();
        }
    }
);

const series = ref([
    {
        name: "Income",
        data: [],
        color: "#4CAF50", // Green
    },
    {
        name: "Expenses",
        data: [],
        color: "#F44336", // Red
    },
    {
        name: "Balance",
        data: [],
        color: "#2196F3", // Blue
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
        categories: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        title: { text: "Month" },
    },
    yaxis: { title: { text: "Amount $" } },
    legend: { position: "top" },
});

const getData = async () => {
    loading.value = true;

    await CashFlowDashboard.monthlyCashflow(filters.value)
        .then((res) => {
            if (res.data.code == "SUCCESS") {
                // Map the data to the series
                series.value[0].data = res.data.data.map((item) => item.spent.income);
                series.value[1].data = res.data.data.map((item) => item.spent.expenses);
                series.value[2].data = res.data.data.map((item) => item.spent.balance);
            }
        })
        .catch((err) => {
            console.log(err);
        });

    loading.value = false;
};

getData();
</script>

<style scoped>
/* Tailwind styles are already applied via tw- prefixes */
</style>