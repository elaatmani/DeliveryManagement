<template>
    <tr 
    :class=" [
        (props.index == 0 && props.page == 1) && 'tw-border-l-4 tw-border-solid tw-border-l-amber-300',
        (props.index == 1 && props.page == 1) && 'tw-border-l-4 tw-border-solid tw-border-l-gray-300',
        (props.index == 2 && props.page == 1) && 'tw-border-l-4 tw-border-solid tw-border-l-orange-400'
        ] "
    class="tw-border-b tw-border-solid tw-border-gray-100 last:tw-border-b-0 tw-group even:tw-bg-gray-50/50">
        <td class="tw-px-2 tw-py-3">
            <div class="tw-flex tw-items-center tw-gap-2">
                <icon icon="fluent:trophy-24-filled" class="tw-text-lg"
                :class=" [
                    (props.index == 0 && props.page == 1) && 'tw-text-amber-300',
                    (props.index == 1 && props.page == 1) && 'tw-text-gray-300',
                    (props.index == 2 && props.page == 1) && 'tw-text-orange-400'
                    ] "
                />
                <div :title="item.name"
                    class="tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-w-[200px] tw-truncate">
                    {{ item.name }}
                </div>
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center">
                {{ formatNumber(item.total_orders, {}) }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center">
                {{ formatNumber(item.total_quantity, {}) }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-sky-500">
                {{ formatNumber(item.total_sales) }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-rose-500">
                {{ formatNumber (item.product_cost) }}
            </div>
        </td>
        
        <td class="tw-px-2 tw-py-3">
            <div
                :title="'Outside: $' + parseFloat(item.outside_beirut_cost).toFixed(2) +' | Inside: $' + parseFloat(item.inside_beirut_cost).toFixed(2)"
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-purple-500">
                <p>{{ formatNumber(parseFloat(item.outside_beirut_cost) + parseFloat(item.inside_beirut_cost)) }}</p>
            </div>
        </td>

        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-amber-500">
                {{ formatNumber (item.total_spent) }}
            </div>
        </td>

        <td class="tw-px-2 tw-py-3">
            <div v-if="props.excludeAds"
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-emerald-500">
                {{ formatNumber(item.net_profit + (item.total_spent ?? 0)) }}
            </div>
            <div v-if="!props.excludeAds"
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-emerald-500">
                {{ formatNumber(item.net_profit) }}
            </div>
        </td>

        <td v-for="c in 0" :key="c" class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-3 tw-bg-gray-50 group-even:tw-bg-white  tw-rounded tw-min-w-[30px] tw-animate-pulse">
            
            </div>
        </td>
    </tr>
</template>

<script setup>
import { defineProps, toRef } from 'vue';

const props = defineProps(['item', 'index', 'page', 'excludeAds'])
const item = toRef(props, 'item')

const formatNumber = (number, type = {style: 'currency', currency: 'USD'}) => {
    return new Intl.NumberFormat('en', { maximumFractionDigits: 2, ...type }).format(number);
}
</script>

<style></style>