<template>
    <div v-if="!props.loading && props.statistics" class="tw-grid tw-grid-cols-2 tw-divide-x tw-border-solid">
        <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
            <span class="tw-text-[10px]">M. V. Coming P.</span>
            <div class="tw-flex tw-items-center tw-gap-1">
                <span class="tw-text-sm tw-text-green-500 tw-font-bold">{{ currency }} {{props.statistics.coming}}</span>
                
            </div>
        </div>
        <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
            <span class="tw-text-[10px]">M. V. Warehouse P.</span>
            <div class="tw-flex tw-items-center tw-gap-1"> 
                <span class="tw-text-sm tw-text-red-500 tw-font-bold">{{ currency }} {{props.statistics.warehouse}}</span>
                
            </div>
        </div>
    </div>
    <div v-else class="tw-grid tw-grid-cols-2 tw-divide-x tw-border-solid">
        <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
            <span class="tw-text-[10px]">M. V. Coming P.</span>
            <div class="tw-flex tw-items-center tw-gap-1">
                <span class="tw-block tw-h-[18px] tw-w-[50px] tw-rounded-md tw-bg-gray-100 tw-animate-pulse"></span>
            </div>
        </div>
        <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
            <span class="tw-text-[10px]">M. V. Warehouse P.</span>
            <div class="tw-flex tw-items-center tw-gap-1">
                <span class="tw-block tw-h-[18px] tw-w-[50px] tw-rounded-md tw-bg-gray-100 tw-animate-pulse"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { currency } from '@/config/config'

const props = defineProps(['statistics', 'loading'])


</script>

<style></style>