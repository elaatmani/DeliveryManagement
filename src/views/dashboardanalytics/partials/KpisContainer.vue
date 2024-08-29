<template>
    <div class="tw-h-full tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-p-4 tw-w-full">
        <p class="tw-text-lg tw-font-bold">KPIs</p>
        <div v-if="loading"  class="tw-mt-3  tw-grid tw-grid-cols-12 tw-gap-3">
            <div class="tw-p-5 tw-h-[70px] tw-bg-gray-100 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12 tw-animate-pulse" v-for="i in 12" :key="i">
            </div>
        </div>

        <div v-else class="tw-mt-3  tw-grid tw-grid-cols-12 tw-gap-4">
            <div class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-black lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Total Orders</p>
                <p class="tw-text-xl tw-font-bold">{{ formatNumber(data.total_orders, {}) }}</p>
            </div>

            <div title="Count of Confirmed Orders" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-emerald-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Confirmed</p>
                <div class="tw-flex tw-items-center tw-justify-between">
                    <p class="tw-text-xl tw-font-bold">{{ formatNumber(data.confirmed_orders, {}) }}</p>
                    
                    <p v-if="data.total_orders > 0" class="tw-text-sm tw-font-semibold">{{ formatNumber((data.confirmed_orders * 100) / data.total_orders, {}) }}%</p>
                    <p v-else class="tw-text-xl tw-font-semibold">·</p>
                </div>
            </div>

            <div title="Count of Delivered Orders" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-green-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Delivered</p>
                <div class="tw-flex tw-items-center tw-justify-between">
                    <p class="tw-text-xl tw-font-bold">{{ formatNumber(data.delivered_orders, {}) }}</p>

                    <p v-if="data.confirmed_orders > 0" class="tw-text-sm tw-font-semibold">{{ formatNumber((data.delivered_orders * 100) / data.confirmed_orders, {}) }}%</p>
                    <p v-else class="tw-text-xl tw-font-semibold">·</p>

                </div>
            </div>

            <div title="Total Ads" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-amber-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Ads</p>
                <p class="tw-text-xl tw-font-bold">{{ formatNumber(data.ads) }}</p>
            </div>

            <div title="Total Ad Spend / Total Orders" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-yellow-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Cost Per Lead</p>
                <p v-if="data.ads > 0" class="tw-text-xl tw-font-bold">{{ formatNumber(data.ads / data.total_orders) }}</p>
                <p v-else class="tw-text-xl tw-font-bold">-</p>
            </div>

            <div title="Total Ad Spend / Total Delivered Orders" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-purple-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Cost Per Delivered</p>
                <p v-if="data.ads > 0" class="tw-text-xl tw-font-bold">{{ formatNumber(data.ads / data.delivered_orders) }}</p>
                <p v-else class="tw-text-xl tw-font-bold">-</p>
            </div>

            <div title="Total Turnover / Total Orders" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-lime-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm" >Average Order Value</p>
                <p v-if="data.turnover > 0" class="tw-text-xl tw-font-bold">{{ formatNumber(data.turnover / data.total_orders) }}</p>
                <p v-else class="tw-text-xl tw-font-bold">-</p>
            </div>

            <div title="Total Profit / Total Delivered Orders (including ads)" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-cyan-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Profit Per Order</p>
                <p v-if="data.profit > 0" class="tw-text-xl tw-font-bold">{{ formatNumber(data.profit / data.delivered_orders) }}</p>
                <p v-else class="tw-text-xl tw-font-bold">-</p>
            </div>

            <div title="Total Profit / Total Delivered Quantity" class="tw-p-2 tw-h tw-border-b-2 tw-border-solid tw-border-violet-500 lg:tw-col-span-3 md:tw-col-span-4 sm:tw-col-span-6 tw-col-span-12" >
                <p class="tw-text-sm">Profit Per Unit</p>
                <p v-if="data.profit > 0" class="tw-text-xl tw-font-bold">{{ formatNumber(data.profit / data.product_quantity) }}</p>
                <p v-else class="tw-text-xl tw-font-bold">-</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Analytics from "@/api/Analytics";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['register', 'loaded']);
const loading = ref(false);
const data = ref({})


const getData = async (filters) => {
    loading.value = true;
    console.log(filters);

    await Analytics.kpis(filters)
        .then(
            res => {
                data.value = res.data
            },
            err => {
                console.log(err)
            }
        )
    loading.value = false;
}

const formatNumber = (number, type = {style: 'currency', currency: 'USD'}) => {
    return new Intl.NumberFormat('en', { maximumFractionDigits: 2, ...type }).format(number);
}


getData();

emit('register', getData)
</script>

<style></style>