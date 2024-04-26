<template>
  <div v-if="!props.loading &&  props.statistics" class="tw-grid tw-grid-cols-3 tw-divide-x tw-border-solid">
    <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
        <span class="tw-text-[10px]">T. SPEND</span>
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-text-sm tw-font-bold tw-text-green-500">{{ currency }}{{props.statistics.spend}}</span>
            <!-- <icon icon="prime:dollar" class="tw-text-sm tw-text-green-500" /> -->
        </div>
    </div>
    <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
        <span class="tw-text-[10px]">T. LEADS</span>
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-text-sm tw-text-cyan-500 tw-font-bold">{{ props.statistics.leads }}</span>
            <icon icon="material-symbols-light:leaderboard-rounded" class="tw-text-sm tw-text-cyan-400" />
        </div>
    </div>

    <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
        <span class="tw-text-[10px]">CPL</span>
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-text-sm tw-text-fuchsia-500 tw-font-bold">{{ currency }}{{ props.statistics.cost_per_lead }}</span>
        </div>
    </div>
  </div>
  <div v-else class="tw-grid tw-grid-cols-3 tw-divide-x tw-border-solid">
    <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
        <span class="tw-text-[10px]">T. SPEND</span>
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-block tw-h-[18px] tw-w-[50px] tw-rounded-md tw-bg-gray-100 tw-animate-pulse"></span>
            <!-- <icon icon="prime:dollar" class="tw-text-sm tw-text-green-500" /> -->
        </div>
    </div>
    <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
        <span class="tw-text-[10px]">T. LEADS</span>
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-block tw-h-[18px] tw-w-[50px] tw-rounded-md tw-bg-gray-100 tw-animate-pulse"></span>
        </div>
    </div>
    
    <div class="tw-min-w-[90px] tw-flex tw-flex-col tw-justify-center tw-p-1 tw-px-2">
        <span class="tw-text-[10px]">CPL</span>
        <div class="tw-flex tw-items-center tw-gap-1">
            <span class="tw-block tw-h-[18px] tw-w-[50px] tw-rounded-md tw-bg-gray-100 tw-animate-pulse"></span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { currency } from '@/config/config'
import { defineProps } from 'vue';

const props = defineProps(['statistics', 'loading'])


</script>

<style>

</style>