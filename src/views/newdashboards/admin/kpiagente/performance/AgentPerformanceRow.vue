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
                <icon v-if="[0, 1, 2].includes(props.index) && props.page == 1" icon="fluent:trophy-24-filled" class="tw-text-lg"
                :class=" [
                    (props.index == 0 && props.page == 1) && 'tw-text-amber-300',
                    (props.index == 1 && props.page == 1) && 'tw-text-gray-300',
                    (props.index == 2 && props.page == 1) && 'tw-text-orange-400'
                    ] "
                />
                <div :title="item.firstname + ' ' + item.lastname"
                    class="tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-w-[200px] tw-truncate">
                    {{ item.firstname + ' ' + item.lastname }}
                </div>
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center">
                {{ formatNumber(item.treated, {}) }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-sky-500">
                {{ formatNumber(item.confirmed, {}) }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-sky-500">
                {{ formatNumber(item.confirmation_rate, {}) }}%
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-emerald-500">
                {{ formatNumber(item.delivered, {}) }}
            </div>
        </td>
        <td class="tw-px-2 tw-py-3">
            <div
                class="tw-w-full tw-py-1 tw-px-1 tw-font-[cairo] tw-text-sm tw-text-center tw-font-bold tw-text-emerald-500">
                {{ formatNumber(item.delivery_rate, {}) }}%
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