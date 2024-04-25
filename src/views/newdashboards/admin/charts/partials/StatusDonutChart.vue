<template>
    <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-w-full">
    <div class=" tw-bg-white tw-rounded tw-border tw-border-solid tw-border-gray-200 tw-relative">

        <div class="tw-p-5">
            <div class="">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium ">Sources</h1>
            <div class="tw-flex tw-w-full tw-justify-end tw-overflow-hidden">
                <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-w-[250px] tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_avant_field">
                <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-w-[250px] tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_apres_field">
                <button @click="getData(date_avant_field, date_apres_field)" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Filter</button>
            </div>
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
const date_avant_field = ref(null);
const date_apres_field = ref(null);
const loading = ref(true);
const loadingUpdating = ref(true);


const getData = async (date_avant_field,date_apres_field) => {
    const cachedData = sessionStorage.getItem('cachedStatusDonut');
    let parsedData = null;

    if (cachedData) {
        parsedData = JSON.parse(cachedData);
        data.value = parsedData.confirmation_state_donuts;
        loading.value = false;
        console.log(data.value);
    }
  
    await Dashboard.ConfirmationStatesDonuts(date_avant_field,date_apres_field)
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
const getColor = (confirmation) => {
    switch (confirmation) {
        case 'no-answer':
            return '#fbbf24'; 
        case null:
            return '#10b981'; 
        case 'change':
            return '#d946ef'; 
        case 'livrer-et-retourner':
            return '#06b6d4'; 
        case 'in-warehouse':
            return '#84cc16'; 
        case 'expidier':
            return '#d946ef'; 
        case 'transfer':
            return '#8b5cf6'; 
        case 'confirmer':
            return '#22c55e'; 
        case 'paid':
            return '#22c55e'; 
        case 'livrer':
            return '#22c55e'; 
        case 'reporter':
            return '#14b8a6'; 
        case 'annuler':
            return '#ef4444'; 
        case 'refund':
            return '#f43f5e'; 
        case 'wrong-number':
            return '#d946ef'; 
        case 'double':
            return '#a855f7'; 
        case 'retourner':
            return '#a855f7'; 
        case 'reconfirmer':
            return '#6366f1'; 
        case 'banned':
            return '#eab308'; 
        case 'pas-de-reponse':
            return '#eab308'; 
        case 'dispatch':
            return '#eab308'; 
        case 'printed':
            return '#3b82f6'; 
        case 'refuser':
            return '#ec4899'; 
        default:
            return '#0000ff'; 
    }
};
var options = computed(() => loading.value ? null : ({
    series: data.value.orders.map(i => i.total),
    chart: {
        type: 'donut',
    },
    fill: { 
       colors: data.value.orders.map(i => getColor(i.confirmation))   
      },

    legend: {
        position: 'top',
        horizontalAlign: 'left',
        markers: {
            fillColors: data.value.orders.map(i => getColor(i.confirmation))
        }
    },  

    theme: {
        monochrome: {
            enabled: true,
            color: '#616161',
          
        },
       
    },
    labels: data.value.orders.map(i => {
            const confirmation = confirmations.find(j => j.value == i.confirmation);
            if(i.confirmation == 'no-answer') {
                return 'No Answer';
            }
            return confirmation ? confirmation.name : '';

        })}));
var optionss = computed(() => loading.value ? null : ({
    series: data.value.delivery.map(i => i.total),
    chart: {
        type: 'donut',
    },
    fill: { 
       colors: data.value.orders.map(i => getColor(i.confirmation))   
      },

    legend: {
        position: 'top',
        horizontalAlign: 'left',
        markers: {
            fillColors: data.value.orders.map(i => getColor(i.confirmation))
        }
    },  

    theme: {
        monochrome: {
            enabled: true,
            color: '#616161',
          
        },
       
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