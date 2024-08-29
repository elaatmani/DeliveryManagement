<template>
    <div class="tw-h-full tw-bg-white tw-border tw-border-solid tw-border-gray-200 tw-p-4 tw-w-full">
        <div class="tw-grid tw-grid-cols-2 tw-gap-2">
            <div>
                <p class="tw-text-lg tw-font-semibold tw-text-gray-700">Turnover</p>
                <p v-if="loading" class="tw-mt-2 tw-w-2/3 tw-h-[32px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-mt-2 tw-text-2xl tw-font-bold">{{ formatNumber(data.turnover) }}</p>
            </div>
            <div>
                <p class="tw-text-lg tw-font-semibold tw-text-gray-700">Net Profit</p>
                <p v-if="loading" class="tw-mt-2 tw-w-2/3 tw-h-[32px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-mt-2 tw-text-2xl tw-font-bold">{{ formatNumber(profit) }}</p>
            </div>
        </div>

        <div class="tw-mt-5 tw-space-y-2 tw-uppercase">


            <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 hover:tw-cursor-pointer" :class="[ exclude.product_cost && 'tw-line-through']" @click="exclude.product_cost = !exclude.product_cost">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <div class="tw-p-2 tw-bg-blue-50 tw-w-fit tw-aspect-square tw-rounded-full">
                        <icon icon="ph:package" class="tw-text-lg tw-text-blue-500" />
                    </div>
                    <p class="tw-text-sm tw-font-medium">Product cost</p>
                </div>
                <div class="tw-h-[0.5px] tw-bg-gray-200 tw-flex-1"></div>
                <p v-if="loading" class="tw-mt-2 tw-w-[100px] tw-h-[26px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-font-semibold tw-text-lg">{{ formatNumber(data.product_cost) }}</p>
            </div>

            <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 hover:tw-cursor-pointer" :class="[ exclude.shipping_cost && 'tw-line-through']" @click="exclude.shipping_cost = !exclude.shipping_cost">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <div class="tw-p-2 tw-bg-purple-50 tw-w-fit tw-aspect-square tw-rounded-full">
                        <icon icon="hugeicons:shipping-truck-02" class="tw-text-lg tw-text-purple-500" />
                    </div>
                    <p class="tw-text-sm tw-font-medium">Shipping</p>
                </div>
                <div class="tw-h-[0.5px] tw-bg-gray-200 tw-flex-1"></div>
                <p v-if="loading" class="tw-mt-2 tw-w-[100px] tw-h-[26px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-font-semibold tw-text-lg">{{ formatNumber(data.shipping_cost) }}</p>
            </div>

            <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 hover:tw-cursor-pointer" :class="[ exclude.ads && 'tw-line-through']" @click="exclude.ads = !exclude.ads">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <div class="tw-p-2 tw-bg-amber-50 tw-w-fit tw-aspect-square tw-rounded-full">
                        <icon icon="material-symbols-light:ads-click-rounded" class="tw-text-lg tw-text-amber-500" />
                    </div>
                    <p class="tw-text-sm tw-font-medium">Ads</p>
                </div>
                <div class="tw-h-[0.5px] tw-bg-gray-200 tw-flex-1"></div>
                <p v-if="loading" class="tw-mt-2 tw-w-[100px] tw-h-[26px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-font-semibold tw-text-lg">{{ formatNumber(data.ads) }}</p>
            </div>

            <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 hover:tw-cursor-pointer" :class="[ exclude.variant_fees && 'tw-line-through']" @click="exclude.variant_fees = !exclude.variant_fees">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <div class="tw-p-2 tw-bg-sky-50 tw-w-fit tw-aspect-square tw-rounded-full">
                        <icon icon="mynaui:question-waves" class="tw-text-lg tw-text-sky-500" />
                    </div>
                    <p class="tw-text-sm tw-font-medium">Others</p>
                </div>
                <div class="tw-h-[0.5px] tw-bg-gray-200 tw-flex-1"></div>
                <p v-if="loading" class="tw-mt-2 tw-w-[100px] tw-h-[26px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-font-semibold tw-text-lg">{{ formatNumber(data.variant_fees) }}</p>
            </div>

            <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-h-[20px]">
                <!-- <div class="tw-h-[0.5px] tw-bg-gray-200 tw-w-1/2 tw-mx-auto"></div> -->
            </div>

            <div class="tw-flex tw-items-center tw-justify-between tw-gap-2">
                <div class="tw-flex tw-items-center tw-gap-2">
                    <div class="tw-p-2 tw-bg-rose-50 tw-w-fit tw-aspect-square tw-rounded-full">
                        <icon icon="healthicons:money-bag-outline" class="tw-text-lg tw-text-rose-500" />
                    </div>
                    <p class="tw-text-sm tw-font-medium">Total</p>
                </div>
                <div class="tw-h-[0.5px] tw-bg-gray-200 tw-flex-1"></div>
                <p v-if="loading" class="tw-mt-2 tw-w-[100px] tw-h-[28px] tw-bg-gray-100 tw-animate-pulse tw-rounded"></p>
                <p v-else class="tw-font-bold tw-text-lg">{{ formatNumber(data.total_fees) }}</p>
            </div>

        </div>
    </div>
</template>

<script setup>
import Dashboard from "@/api/Dashboard";
import { computed } from "vue";
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['register']);
const exclude = ref({})
const loading = ref(false);
const data = ref({});

const profit = computed(() => {

    let result = data.value.profit;

    if(exclude.value.product_cost) {
        result += data.value.product_cost
    }

    if(exclude.value.shipping_cost) {
        result += data.value.shipping_cost
    }

    if(exclude.value.ads) {
        result += data.value.ads
    }

    if(exclude.value.variant_fees) {
        result += data.value.variant_fees
    }

    return result;
})


const getData = async (filters) => {
    loading.value = true;
    console.log(filters);

    await Dashboard.revenue(filters)
        .then(
            res => {
                data.value = res.data.data
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