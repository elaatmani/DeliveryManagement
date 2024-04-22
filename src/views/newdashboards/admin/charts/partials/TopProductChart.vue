<template >
    <div class="tw-p-5 tw-relative">
        <div class="tw-flex tw-justify-between">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Top Selling Product</h1>
            <div v-if="loadingUpdating && !loading" class="tw-flex tw-text-neutral-500 tw-items-center tw-gap-1 tw-absolute tw-top-2 tw-right-3">
                <Loading class="tw-scale-50" />
                <p class=" tw-tetx-xs">Updating</p>
            </div>
        </div>
        <div class="tw-flex tw-justify-between tw-items-center" >
            <select v-model="perPage" @change="e => getData(null,null,null,null,e.target.value)" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <input v-model.number="lineHeight" type="number" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" />
        </div>

        <div v-if="false" class="tw-flex tw-justify-between tw-items-center">
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
        <div v-if="false"
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
        <div v-if="!loading" >
            <apexchart :height="perPage * lineHeight" :key="lineHeight"  :series="options.series" :chart="options.chart" :options="options"></apexchart>
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
const isCustom = ref(false);
const dateRange = ref('lastsevendays');
const perPage = ref(10);
const lineHeight = ref(80);
const date_avant_field = ref(null);
const date_apres_field = ref(null);

const loading = ref(true);
const loadingUpdating = ref(true);
function sliceObject(obj, nb) {
    const keys = Object.keys(obj).slice(0, nb);
    const slicedObj = {};
    keys.forEach(key => {
        slicedObj[key] = obj[key];
    });
    return slicedObj;
}
const getData = async (date_avant = null, date_apres = null, period = 'lastsevendays', selectedOption = null, nb = 10) => {
    const cachedData = sessionStorage.getItem('cachedTopProduct');
    let parsedData = null;

    if (cachedData) {
        parsedData = JSON.parse(cachedData);
        if (parsedData.date_avant === date_avant && parsedData.date_apres === date_apres && parsedData.period === period && parsedData.selectedOption === selectedOption) {
            data.value = parsedData.topProducts;
            loading.value = false;
        }
    }

    if (!date_avant || !date_apres) {
        isCustom.value = false;
        dateRange.value = period;
    } else {
        dateRange.value = null;
    }

    // Show loading state only if the request parameters have changed
    if (!parsedData || parsedData.date_avant !== date_avant || parsedData.date_apres !== date_apres || parsedData.period !== period || parsedData.selectedOption !== selectedOption) {
        loading.value = true;
        loadingUpdating.value = true;

    }

    await Dashboard.TopProductSelles(date_avant, date_apres, period, selectedOption)
    .then(res => {
        if (res.data.code === 'SUCCESS') {
            const newData = {
                date_avant,
                date_apres,
                period,
                selectedOption,
                topProducts: Object.values(sliceObject(res.data.data.topProducts, nb))
            };

            if (!parsedData || JSON.stringify(parsedData.topProducts) !== JSON.stringify(newData.topProducts)) {
                sessionStorage.setItem('cachedTopProduct', JSON.stringify(newData));
                data.value = newData.topProducts;
                loadingUpdating.value = true
            } else {
                loadingUpdating.value = false;
            }
            loadingUpdating.value = false
            loading.value = false;
        }
    });
};

getData(perPage.value);


var options = computed(() => {
    const series = [
        {
            name: "Total Orders",
            data: data.value.map(product => product.total_orders)
        },
        {
            name: "Total Quantity",
            data: data.value.map(product => product.total_quantity)
        }
    ];

    return {
        series:series,

        chart: {
            type: 'bar',
        },
        plotOptions: {
                bar: {
                horizontal: true,

                }
                
            },
        xaxis: {
            type: 'category',
            categories: data.value.map(product => product.product_name), 
        },

        theme: {
            palette: 'palette8'
        },
        stroke: {
            curve: 'smooth',
            },
       
        fill:{
            height: 1,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    };
});

</script>
<style lang="">
    
</style>