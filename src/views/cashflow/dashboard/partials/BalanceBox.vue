<template>
    <div class="tw-bg-white tw-p-4 tw-h-full tw-flex tw-flex-col">
        <h2 v-if="false" class="tw-text-lg tw-font-semibold tw-mb-2">My Balance</h2>

        <div class="tw-grid tw-grid-cols-2 tw-gap-2 tw-flex-1">
            <div class=" ">
                <p class="tw-text-lg">Your Balance</p>
                <p v-if="loading"
                    class="tw-text-2xl tw-font-bold tw-h-[32px] tw-bg-gray-200 tw-animate-pulse tw-rounded tw-w-[200px]">
                </p>
                <p v-else class="tw-text-2xl tw-font-bold" :class="[data.balance <= 0 && 'tw-text-rose-400']">{{ formatNumber(data.balance) }}</p>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2">
                <div class="tw-flex-1">
                    <p class="tw-text-sm tw-font-semibold">Cash In</p>
                    <p v-if="loading"
                        class="tw-text-2xl tw-font-bold tw-h-[24px] tw-bg-gray-200 tw-animate-pulse tw-rounded tw-w-[150px]">
                    </p>
                    <p v-else class="tw-text- tw-font-bold tw-text-emerald-500">{{ formatNumber(data.income) }}</p>
                </div>
                <div class="tw-flex-1">
                    <p class="tw-text-sm tw-font-semibold">Cash Out</p>
                    <p v-if="loading"
                        class="tw-text-2xl tw-font-bold tw-h-[24px] tw-bg-gray-200 tw-animate-pulse tw-rounded tw-w-[150px]">
                    </p>
                    <p v-else class="tw-text- tw-font-bold tw-text-rose-400">{{ formatNumber(data.expenses) }}</p>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>

import CashFlowDashboard from "@/api/CashFlowDashboard";
import { ref, inject, watch } from "vue";

const data = ref({});
const loading = ref(false);

const filters = inject('filters');

watch(() => filters.value.count, (newv, oldv) => {
    if (newv != oldv) {
        getData();
    }
});

const getData = async () => {
    loading.value = true;

    await CashFlowDashboard.balance(filters.value)
        .then((res) => {
            if (res.data.code == 'SUCCESS') {
                console.log(res.data);
                data.value = res.data.data;

            }
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    loading.value = false;
    // Fetch data from API
};

const formatNumber = (number, type = { style: 'currency', currency: 'USD' }) => {
    return new Intl.NumberFormat('en', { maximumFractionDigits: 2, ...type }).format(number);
}

getData();
</script>

<style scoped>
/* Tailwind styles are already applied via tw- prefixes */
</style>