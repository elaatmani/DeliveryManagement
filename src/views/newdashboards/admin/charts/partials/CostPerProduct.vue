<template >
    <div class="tw-p-5">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Total Spend For Each Product</h1>

        <div class="tw-flex  tw-flex-wrap tw-justify-between tw-items-center">
        <div class="tw-flex">
            <button @click="getData(null,null,'week')" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Week</button>
            <button @click="getData(null,null,'month')"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Month</button>
            <button @click="getData(null,null,'lastsevendays')" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Last Seven Days </button>
            <button @click="getData(null,null,'lastmonth')"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Last Month</button>
            <button @click="getData(null,null,'year')"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Year</button>
        </div>
      
        <div  class="tw-flex">
            <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_avant">
            <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_apres">
            <button @click="getData(date_avant, date_apres)" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Filter</button>
        </div>
        </div>
        <div class="tw-flex">
        <!-- Menu déroulant pour sélectionner la série -->
        <select v-model="selectedSeries" @change="updateChart">
            <option value="all">All</option>
          <option v-for="(series, index) in data" :key="index" :value="index">{{ series.name }}</option>
        </select>
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
// import vueSelect from 'vue-select';
import { computed ,ref} from 'vue';
const data = ref([]);
const selectedSeries = ref(0);
// defineComponent({
//   components: {
//     'vue-select': vueSelect
//   },
// });
const loading = ref(true);
const getData = async (date_avant = null, date_apres = null, period = null,selectedOption = null) => {
    loading.value = true;
    await Dashboard.CostPerProduct(date_avant, date_apres, period,selectedOption)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                data.value = res.data.data.cost_per_product;
                loading.value = false;
            }
        }
    );
}
getData();
const updateChart = async () => {
    console.log(selectedSeries.value);
    if (selectedSeries.value === 'all') {
        options.value.series = [{name: 'all', data: data.value.map(i => ({...i, data: i.data.map(j => j.cost_per_product)}))}];
        console.log( options.value.series);

    } else {
        options.value.series = [{
            name: data.value[selectedSeries.value].name,
            data: data.value[selectedSeries.value].data.map(item => item.cost_per_product)
        }];
        console.log( options.value.series);

    }
}
var options = computed(() => {

    return {
        series: [{
            name: data.value[selectedSeries.value].name,
            data: data.value[selectedSeries.value].data.map(item => item.cost_per_product)
         }],

        chart: {
            type: 'area',
        },
        xaxis: {
            type: 'category',
            categories: data.value[selectedSeries.value].data.map(item => item.date), 
        },

        theme: {
            palette: 'palette7'
        },
        stroke: {
            curve: 'smooth',
            },
       
        fill: {
            opacity: 1,
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