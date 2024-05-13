<template >
    <div class="tw-p-5 tw-relative">
        <div class="tw-flex tw-justify-between">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Leads Per Day</h1>
            <div v-if="loadingUpdating && !loading" class="tw-flex tw-text-neutral-500 tw-items-center tw-gap-1 tw-absolute tw-top-2 tw-right-3">
                <Loading class="tw-scale-50" />
                <p class=" tw-tetx-xs">Updating</p>
            </div>
        </div>
        <div class="tw-flex tw-justify-between tw-items-center">
            <div class="tw-flex tw-w-full">
            <button :class="[dateRange == 'lastsevendays' && '!tw-bg-orange-500 tw-text-white']" @click="getData(null,null,'lastsevendays')" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Last Seven Days </button>
            <button :class="[dateRange == 'week' && '!tw-bg-orange-500 tw-text-white']" @click="getData(null,null,'week')" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Week</button>
            <button :class="[dateRange == 'month' && '!tw-bg-orange-500 tw-text-white']" @click="getData(null,null,'month')"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Month</button>
            <button :class="[dateRange == 'lastmonth' && '!tw-bg-orange-500 tw-text-white']" @click="getData(null,null,'lastmonth')"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Last Month</button>
            <button :class="[dateRange == 'year' && '!tw-bg-orange-500 tw-text-white']" @click="getData(null,null,'year')"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Year</button>
            <button @click="isCustom = !isCustom" :class="[isCustom && '!tw-bg-orange-500 !tw-text-white']" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">
                <icon icon="ph:gear-six-duotone" class="tw-text-2xl" />
                <span>Custom</span>
            </button>
        </div>
        <div
            :class="[isCustom ? 'tw-grid-rows-[1fr]' : 'tw-grid-rows-[0fr]']"
            class="tw-grid tw-duration-300 tw-transition-all"
            >
            <div class="tw-flex tw-w-full tw-justify-end tw-overflow-hidden">
                <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-w-[250px] tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_avant_field">
                <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-w-[250px] tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_apres_field">
                <button @click="getData(date_avant_field, date_apres_field)" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Filter</button>
            </div>
        </div>
        </div>
        <div v-if="!loading">
            <apexchart :height="400"  :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
</template>
<script setup>
import Dashboard from '@/api/Dashboard';
import { computed,ref } from 'vue';
const data = ref([]);

const loading = ref(true);
const isCustom = ref(false);
const dateRange = ref('lastsevendays');
const date_avant_field = ref(null);
const date_apres_field = ref(null);

const loadingUpdating = ref(true);

const getData = async (date_avant = null, date_apres = null, period = 'lastsevendays') => {
    const cachedData = sessionStorage.getItem('cachedLeadPerDay');
    let parsedData = null;

    if (cachedData) {
        parsedData = JSON.parse(cachedData);
        if (parsedData.date_avant === date_avant && parsedData.date_apres === date_apres && parsedData.period === period) {
            data.value = parsedData.leads_per_day;
            loading.value = false;
        }
    }
    if(!date_apres || !date_apres) {
        isCustom.value = false;
        dateRange.value = period
    } else {
        dateRange.value = null
    }
    if (!parsedData || parsedData.date_avant !== date_avant || parsedData.date_apres !== date_apres || parsedData.period !== period) {
        loading.value = true;
        loadingUpdating.value = true;

    }
    await Dashboard.LeadsPerDay(date_avant, date_apres, period)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                if (res.data.code === 'SUCCESS') {
                const newData = {
                    date_avant,
                    date_apres,
                    period,
                    leads_per_day: res.data.data.leads_per_day
                };
                if (!parsedData || JSON.stringify(parsedData.leads_per_day) !== JSON.stringify(newData.leads_per_day)) {
                    sessionStorage.setItem('cachedLeadPerDay', JSON.stringify(newData));
                    data.value = res.data.data.leads_per_day;
                    loadingUpdating.value = true
                } else {
                    loadingUpdating.value = false;

                }
                loadingUpdating.value = false
                loading.value = false;
            }
        }
    }
    );
}

getData();

var options = computed(() => loading.value ? null : ({
    series: [
        {
            name: 'Leads',
            data: data.value ? data.value.map(p => p ? p.leads : null) : [] 
        },],

    chart: {
        type: 'area',
    },
    dataLabels: {
        formatter: function (value) {
                return value.toFixed(2); // limit to 2 decimal places
            }
    },
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    xaxis: {
        categories: data.value.map(p => p.date),
        labels: {
            // formatter: (val) => {
            //     return val / 1000 + 'K'
            // }
        }
    },
    fill: {
        opacity: 1,
    },
    // colors: ['#22c55e', '#f43f5e'],
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    }
}));
</script>
<style lang="">
    
</style>