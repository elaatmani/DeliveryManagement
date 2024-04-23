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
            <div class="tw-flex tw-items-center">
                <select v-model="nb" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <select v-model="filterBytype" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">
                    <option value="asc">The best selling product</option>
                    <option value="des">the lowest selling product</option>
                </select>
                <select v-model="filterByQO" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">
                    <option value="default">By Default</option>
                    <option value="order">By Total Order</option>
                    <option value="quantity">By Total Quantity</option>
                </select>
                <button @click="getData(filterBytype, filterByQO, nb)" class="tw-items-center tw-text-white hover:tw-text-neutral-700  tw-gap-2 tw-py-2 tw-px-4 tw-bg-orange-500 hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Filter</button>
            </div>
            <div>
                <input v-model.number="lineHeight" type="number" class="tw-flex tw-justify-center tw-gap-2 tw-items-center tw-text-neutral-700 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" />
            </div>
        </div>
        <div v-if="!loading" >
            <apexchart :height="perPage * lineHeight" :key="lineHeight"  :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center"><Loading />
        </div>
    </div>
</template>
<script setup>
import Dashboard from '@/api/Dashboard';
import { computed,ref } from 'vue';

const data = ref([]);
const perPage = ref(10);
const lineHeight = ref(80);
const filterBytype =ref('asc')
const filterByQO =ref('default')
const nb = ref(10)


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
const getData = async (filterByQO,filterBytype,nb) => {
    const cachedData = sessionStorage.getItem('cachedTopProduct');
    let parsedData = null;

    if (cachedData) {
        parsedData = JSON.parse(cachedData);
        if (parsedData.filterByQO === filterByQO && parsedData.filterBytype === filterBytype) {
            data.value = parsedData.topProducts;
            loading.value = false;
        }
    }

    if (!parsedData || parsedData.filterByQO !== filterByQO || parsedData.filterBytype !== filterBytype ) {
        loading.value = true;
        loadingUpdating.value = true;
    }

    await Dashboard.TopProductSelles({filterByQO: filterByQO, filterBytype: filterBytype, per_page: nb})
    .then(res => {
        if (res.data.code === 'SUCCESS') {
            const newData = {
                filterByQO,
                filterBytype,
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

getData(null,null,perPage.value);


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