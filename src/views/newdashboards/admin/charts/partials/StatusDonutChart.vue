<template>
    <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-w-full">
    <div class=" tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-relative">

        <div class="tw-p-5">
            <div class="tw-flex tw-justify-between">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium ">Sources</h1>
            <div v-if="loadingUpdating && !loading" class="tw-flex tw-text-neutral-500 tw-items-center tw-gap-1 tw-absolute tw-top-2 tw-right-3">
                <Loading class="tw-scale-50" />
                <p class=" tw-tetx-xs">Updating...</p>
            </div>
        </div>
            <div v-if="!loading">
                <apexchart :height="400" :series="optionsss.series" :chart="optionsss.chart" :options="optionsss"></apexchart>
            </div>
            <div v-else class="tw-min-h-[400px] tw-flex tw-items-center tw-justify-center">
                <Loading />
            </div>
        </div>
    </div>
    <div class=" tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-relative">

        <div class="tw-p-5">
            
            <div class="tw-flex tw-justify-between">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium ">Confirmation Rate</h1>
            <div v-if="loadingUpdating && !loading" class="tw-flex tw-text-neutral-500 tw-items-center tw-gap-1 tw-absolute tw-top-2 tw-right-3">
                <Loading class="tw-scale-50" />
                <p class=" tw-tetx-xs">Updating...</p>
            </div>
            </div>
            <div v-if="!loading">
                <apexchart :height="400" :series="options.series" :chart="options.chart" :options="options"></apexchart>
            </div>
            <div v-else class="tw-min-h-[400px] tw-flex tw-items-center tw-justify-center">
                <Loading />
            </div>
        </div>
    </div>
    <div class=" tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-relative">

        <div class="tw-p-5">
            <div class="tw-flex tw-justify-between">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium ">Delivery Rate</h1>
            <div v-if="loadingUpdating" class="tw-flex tw-text-neutral-500 tw-items-center tw-gap-1 tw-absolute tw-top-2 tw-right-3">
                <Loading class="tw-scale-50" />
                <p class=" tw-tetx-xs">Updating...</p>
            </div>
            </div>
            <div v-if="!loading">
                <apexchart :height="400" :series="optionss.series" :chart="optionss.chart" :options="optionss"></apexchart>
            </div>
            <div v-else class="tw-min-h-[400px] tw-flex tw-items-center tw-justify-center">
                <Loading />
            </div>
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
const loadingUpdating = ref(true);


const getData = async () => {
    const cachedData = sessionStorage.getItem('cachedStatusDonut');
    let parsedData = null;

    if (cachedData) {
        parsedData = JSON.parse(cachedData);
        data.value = parsedData.confirmation_state_donuts;
        loading.value = false;
        console.log(data.value);
    }
  
    await Dashboard.ConfirmationStatesDonuts()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                const newData = {
                    confirmation_state_donuts: res.data.data.confirmation_state_donuts[0]
                };

                if (!parsedData || JSON.stringify(parsedData.confirmation_state_donuts) !== JSON.stringify(newData.confirmation_state_donuts)) {
                    sessionStorage.setItem('cachedStatusDonut', JSON.stringify(newData));
                    data.value = res.data.data.confirmation_state_donuts[0];
                  
                    loadingUpdating.value = true
                } else {
                   
                    loadingUpdating.value = false;

                }
                loadingUpdating.value = false

                loading.value = false;
            }
        }
    );
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