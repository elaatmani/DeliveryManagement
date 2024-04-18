<template >
    <div class="tw-p-5">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Total Spend For Each Product</h1>

        <div class="tw-flex  tw-flex-wrap tw-justify-between tw-items-center">
        <div class="tw-flex">
            <button @click="getData(null,null,'week',selectedSeries)" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Week</button>
            <button @click="getData(null,null,'month',selectedSeries)"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Month</button>
            <button @click="getData(null,null,'lastsevendays',selectedSeries)" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Last Seven Days </button>
            <button @click="getData(null,null,'lastmonth',selectedSeries)"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Last Month</button>
            <button @click="getData(null,null,'year',selectedSeries)"  class=" tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">This Year</button>
        </div>
       <div class="tw-flex">
            <vue-select 
                :reduce="(series) => series" 
                @input="updateChart" 
                :clearable="false" 
                class="tw-bg-gray-50  tw-items-center tw-border-solid tw-outline-none  tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-[200px]"
                placeholder="All" 
                v-model="selectedSeries" 
                :options="seriesOptions" 
                label="name">
            </vue-select>
      </div>
        <div  class="tw-flex">
            <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_avant">
            <input type="date" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2" v-model="date_apres">
            <button @click="getData(date_avant, date_apres)" class="tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-mx-1 tw-border-neutral-200 tw-rounded-md tw-mb-2">Filter</button>
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
import vueSelect from 'vue-select';
import { computed ,ref,defineComponent} from 'vue';
import { watch } from 'vue';


defineComponent({
  components: {
    'vue-select': vueSelect
  },
});
const data = ref([]);
const selectedSeries = ref('all');
const loading = ref(true);

const allData = ref([]); 
const seriesOptions = computed(() => ['all', ...allData.value.map((series) => series.name)]);

const getData = async (date_avant = null, date_apres = null, period = null) => {
    loading.value = true;
    await Dashboard.CostPerProduct(date_avant, date_apres, period)
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                allData.value = res.data.data.cost_per_product;
                if (selectedSeries.value && selectedSeries.value !== 'all') {
                    data.value = allData.value.filter(product => product.name === selectedSeries.value)
                } else {
                    data.value = allData.value; 
                }
                loading.value = false;
                updateChart();
            }
        }
    );
}
getData();

const updateChart = async () => {
    if (selectedSeries.value === 'all') {
        options.value.series = data.value.map(series => ({
            name: series.name,
            data: series.data.map(item => item.cost_per_product)
        }));
    } else {
        const selectedData = data.value.find(series => series.name === selectedSeries.value);
        if (selectedData) {
            options.value.series = [{
                name: selectedData.name,
                data: selectedData.data.map(item => item.cost_per_product)
            }];
        }
    }
}
watch(selectedSeries, () => {
    getData(null, null, null, selectedSeries.value);
    updateChart();
});
var options = computed(() => {
    let series = [];

    if (selectedSeries.value === 'all') {
        series = data.value.map(series => ({
            name: series.name,
            data: series.data.map(item => item.cost_per_product)
        }));
    } else if (data.value[selectedSeries.value]) {
        series = [{
            name: data.value[selectedSeries.value].name,
            data: data.value[selectedSeries.value].data.map(item => item.cost_per_product)
        }];
    }

    return {
        series: series,
        chart: {
            type: 'area',
        },
        xaxis: {
            type: 'category',
            categories: data.value[0].data.map(c => c.date), 
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