<template>
  <div class="tw-flex">
    <div class="tw-p-5 tw-w-[50%]">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Confirmations Rates</h1>

        <div v-if="!props.loading">
            <apexchart :height="400" :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
    <div class="tw-p-5 tw-w-[50%]">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Delivery Rates</h1>

        <div v-if="!props.loading">
            <apexchart :height="400" :series="optionss.series" :chart="optionss.chart" :options="optionss"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { confirmations, deliveryStatus } from '@/config/orders'
import { defineProps } from 'vue'

const props = defineProps({
  chartData: Object,
  loading: Boolean

})


var options = computed(() => props.loading ? null : ({
    series: props.chartData.orders.map(i => i.total),
    chart: {
        type: 'donut',
    },

    fill: {
        opacity: 1,
    },
    // colors: ['#22c55e', '#f43f5e'],
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    labels: props.chartData.orders.map(i => confirmations.find(j => j.value == i.confirmation)?.name)
}));
var optionss = computed(() => props.loading ? null : ({
    series: props.chartData.delivery.map(i => i.total),
    chart: {
        type: 'donut',
    },

    fill: {
        opacity: 1,
    },
    // colors: ['#22c55e', '#f43f5e'],
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    labels: props.chartData.delivery.map(i => deliveryStatus.find(j => j.value == i.delivery)?.name)
}));

</script>

<style></style>