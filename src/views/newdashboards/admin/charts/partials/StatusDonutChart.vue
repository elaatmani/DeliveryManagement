<template>
  <div class="tw-flex">
    <div class="tw-p-5 tw-w-[33%]">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Sources</h1>

        <div v-if="!loading">
            <apexchart :height="400" :series="optionsss.series" :chart="optionsss.chart" :options="optionsss"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
    <div class="tw-p-5 tw-w-[33%]">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Confirmation Rate</h1>

        <div v-if="!loading">
            <apexchart :height="400" :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
    <div class="tw-p-5 tw-w-[33%]">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Delivery Rate</h1>

        <div v-if="!loading">
            <apexchart :height="400" :series="optionss.series" :chart="optionss.chart" :options="optionss"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
  </div>
</template>

<script setup>
import Dashboard from '@/api/Dashboard';
import { computed, ref } from 'vue';
import { confirmations, deliveryStatus } from '@/config/orders'



const data = ref([]);
const loading = ref(true);


const getData = async () => {
    loading.value = true;
    await Dashboard.ConfirmationStatesDonuts()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                data.value = res.data.data.confirmation_state_donuts[0];
                loading.value = false;
            }
        }
    );
    loading.value = false;
}

getData();

var options = computed(() => loading.value ? null : ({
    series: data.value.orders.map(i => i.total),
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
    labels: data.value.orders.map(i => confirmations.find(j => j.value == i.confirmation)?.name)
}));
var optionss = computed(() => loading.value ? null : ({
    series: data.value.delivery.map(i => i.total),
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
    labels: data.value.delivery.map(i => deliveryStatus.find(j => j.value == i.delivery)?.name)
}));
var optionsss = computed(() => loading.value ? null : ({
    series: data.value.lead.map(i => i.total),
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
    labels: data.value.lead.map(j => j.source)
}));
</script>

<style></style>