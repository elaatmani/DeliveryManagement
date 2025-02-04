<template>
    <tr
    class="tw-border-b tw-border-solid tw-border-gray-100 last:tw-border-b-0 tw-group even:tw-bg-gray-50/50">
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center">
                {{ item.id }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center">
                <p class="tw-ml-1">{{ moment(item.spent_at).format("DD[/]MM[/]YY") }}</p>
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center">
                {{ item.firstname }} {{ item.lastname }}
            </div>
        </td>

        

        <td class="tw-px-2 tw-py-3 tw-text-xs">
            <div v-if="item.type == 'cash-in'"
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-flex tw-items-center tw-gap-2 tw-font-bold ">
                <icon icon="solar:cash-out-outline" class="tw-text-xl tw-text-emerald-500" />
                <span>Cash In</span>
            </div>
            
            <div v-if="item.type == 'cash-out'"
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-flex tw-items-center tw-gap-2 tw-font-bold ">
                <icon icon="solar:cash-out-outline" class="tw-text-xl tw-rotate-180 tw-text-rose-400" />
                <span>Cash Out</span>
            </div>

        </td>

        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold" :class="[item.type == 'cash-in' ? 'tw-text-emerald-500' : 'tw-text-rose-400']">
                {{ formatNumber (item.amount) }}
            </div>
        </td>
        

        <td class="tw-px-2 tw-py-3">
            <div v-if="category"
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-black">
                {{ category.name }}
            </div>

            <div v-else
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-gray-600">
                {{  'Uncategorized' }}
            </div>
        </td>

        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-xs tw-text-center tw-font-bold tw-text-amber-500">
                {{ item.description }}
            </div>
        </td>


        <td class="tw-px-2 tw-py-3">
        </td>

    </tr>
</template>

<script setup>
import { defineProps, toRef, inject, computed } from 'vue';
import moment from 'moment';

const props = defineProps(['item', 'index', 'page'])
const item = toRef(props, 'item')
const categories = inject('categories');
const category = computed(() => categories.value.find(category => category.id === item.value.cash_flow_category_id));


const formatNumber = (number, type = {style: 'currency', currency: 'USD'}) => {
    return new Intl.NumberFormat('en', { maximumFractionDigits: 2, ...type }).format(number);
}
</script>

<style></style>