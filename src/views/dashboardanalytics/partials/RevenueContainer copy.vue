<template>
    <div>
        <div v-if="loading" class="tw-p-2 tw-bg-white tw-border tw-border-solid tw-border-gray-200">
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-divide-x tw-gap-5">
            <div class="tw-h-[105px]  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <div class="tw-flex tw-items-center tw-gap-1">
                    <p class="tw-text-sm tw-text-gray-400">Delivered</p>
                    <icon icon="ph:info-light" class="tw-text-lg tw-text-gray-400" />
                </div>
                <div class="tw-h-[30px] tw-w-[120px] tw-bg-gray-100 tw-rounded tw-animate-pulse"></div>
            </div>

            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <p class="tw-text-sm tw-text-gray-400">Expenses</p>
                <div class="tw-h-[30px] tw-w-[120px] tw-bg-gray-100 tw-rounded tw-animate-pulse"></div>
            </div>

            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <p class="tw-text-sm tw-text-gray-400">Profit</p>
                <div class="tw-h-[30px] tw-w-[120px] tw-bg-gray-100 tw-rounded tw-animate-pulse"></div>
            </div>
            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <p class="tw-text-sm tw-text-gray-400">Ads</p>
                <div class="tw-h-[30px] tw-w-[120px] tw-bg-gray-100 tw-rounded tw-animate-pulse"></div>
            </div>

        </div>
    </div>
    <div v-if="!loading" class="tw-p-2 tw-bg-white tw-border tw-border-solid tw-border-gray-200">
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-divide-x tw-gap-5">
            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <div class="tw-flex tw-items-center tw-gap-1 tw-relative">
                    <p class="tw-text-sm tw-text-gray-400">Delivered</p>
                    <icon icon="ph:info-light"
                        class="tw-text-lg tw-text-gray-400 hover:tw-text-gray-600 tw-duration-200 tw-cursor-pointer" />
                </div>
                <p class="tw-text-2xl tw-font-bold">{{ new Intl.NumberFormat('en', {
                    style: 'currency', currency: 'USD'
                }).format(data.orders.sum_delivered) }} <span v-if="false"
                        class="tw-text-sm tw-text-emerald-400">+2.8%</span></p>
                        <p class="tw-text-sm tw-text-gray-400 tw-font-medium">Shipping fees: <span
                        class="tw-font-bold tw-text-black">{{ new Intl.NumberFormat('en', {
                            style: 'currency', currency:
                                'USD'
                        }).format(parseFloat(data.shipping.inside_b) + parseFloat(data.shipping.outside_b)) }}</span></p>
            </div>

            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <p class="tw-text-sm tw-text-gray-400">Expenses</p>
                <p class="tw-text-2xl tw-font-bold">{{ new Intl.NumberFormat('en', {
                    style: 'currency', currency: 'USD'
                }).format(data.total_fees) }} <span v-if="false"
                        class="tw-text-sm tw-text-emerald-400">+10.8%</span></p>
                <p class="tw-text-sm tw-text-gray-400 tw-font-medium">Product fees({{ data.orders.total_quantity }}): <span
                        class="tw-font-bold tw-text-black">{{ new Intl.NumberFormat('en', {
                            style: 'currency', currency:
                                'USD'
                        }).format(data.orders.product_expenses) }}</span></p>
                
            </div>

            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <p class="tw-text-sm tw-text-gray-400">Profit</p>
                <p class="tw-text-2xl tw-font-bold">{{ new Intl.NumberFormat('en', {
                    style: 'currency', currency: 'USD'
                }).format(data.profit) }} <span v-if="false" class="tw-text-sm tw-text-emerald-400">+10.8%</span>
                </p>
                <p class="tw-text-sm tw-text-gray-400 tw-font-medium">Variant fees: <span
                        class="tw-font-bold tw-text-black">{{ new Intl.NumberFormat('en', {
                            style: 'currency', currency:
                                'USD'
                        }).format(data.shipping.variant_fees) }}</span></p>
            </div>

            <div class="tw-h-[150px]x  tw-border-gray-100 tw-p-2 tw-pl-5 tw-flex tw-flex-col tw-gap-2">
                <p class="tw-text-sm tw-text-gray-400">Ads</p>
                <p class="tw-text-2xl tw-font-bold">{{ new Intl.NumberFormat('en', {
                    style: 'currency', currency: 'USD'
                }).format(data.ads) }} <span v-if="false" class="tw-text-sm tw-text-emerald-400">+10.8%</span>
                </p>
            </div>

        </div>
    </div>
    </div>
</template>

<script setup>
import Dashboard from "@/api/Dashboard";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['register', 'loaded']);
const loading = ref(false);
const data = ref({})


const getData = async (filters) => {
    loading.value = true;
    console.log(filters);
    
    await Dashboard.revenue(filters)
        .then(
            res => {
                data.value = res.data.data
                emit('loaded', data.value.profit)
            },
            err => {
                console.log(err)
            }
        )
    loading.value = false;
}

getData();

emit('register', getData)
</script>

<style></style>