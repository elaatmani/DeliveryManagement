<template>
    <div class="tw-bg-white tw-p-4">
        <h2 class="tw-text-lg tw-font-semibold tw-mb-2">Expense Distribution</h2>
        <!-- Skeleton Loader -->
        <div v-if="loading" class="tw-flex tw-items-center tw-justify-center tw-h-[320px]">
            <div class="tw-relative tw-w-40 tw-h-40">
                <div class="tw-absolute tw-inset-0 tw-rounded-full tw-border-8 tw-border-gray-300"></div>
                <div
                    class="tw-absolute tw-inset-0 tw-rounded-full tw-border-8 tw-border-transparent tw-border-t-gray-400 tw-animate-spin">
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="data.length">
                <apexchart  type="donut" :options="chartOptions" :series="series" height="350" class="tw-w-full" />
            </div>
            <div v-else class="tw-h-[320px] tw-flex tw-items-center tw-justify-center">
                <p class="tw-text-center tw-text-gray-700">No Expenses</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, watch } from "vue";
import CashFlowDashboard from "@/api/CashFlowDashboard";

const loading = ref(false);
const data = ref({});
const series = ref([40, 25]); // Percentage values for categories

const filters = inject('filters');

watch(() => filters.value.count, (newv, oldv) => {
    if (newv != oldv) {
        getData();
    }
});

const chartOptions = ref({
    labels: ["Salaries", "Food", "Rent", "Entertainment", "Others"],
    chart: {
        type: "donut",
    },
    legend: {
        position: "bottom",
    },
    dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
    },
    colors: ["#FFA500", "#00BFFF", "#FF4500", "#8A2BE2", "#32CD32"], // Custom colors
});

const getData = async () => {
    loading.value = true;

    await CashFlowDashboard.expensesByCategory(filters.value)
        .then((res) => {
            if (res.data.code == 'SUCCESS') {
                chartOptions.value.labels = res.data.data.map(i => i.category_name);
                series.value = res.data.data.map(i => parseFloat(i.expense));
                data.value = res.data.data;
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