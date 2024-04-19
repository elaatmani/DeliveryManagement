<template >
    <div class="tw-p-5">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Total Spend For Each Product</h1>

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
        <div class="tw-flex">
            <vue-select 
                :reduce="(series) => series" 
                @input="updateChart" 
                :clearable="false" 
                class="tw-bg-white tw-items-center tw-border-solid tw-outline-none  tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-[200px] tw-h-[44px]"
                placeholder="All" 
                v-model="selectedSeries" 
                :options="seriesOptions" 
                label="name">
            </vue-select>
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
const isCustom = ref(false);
const dateRange = ref('lastsevendays');
const date_avant_field = ref(null);
const date_apres_field = ref(null);

const allData = ref([]); 
const seriesOptions = computed(() => ['all', ...allData.value.map((series) => series.name)]);

const getData = async (date_avant = null, date_apres = null, period = 'lastsevendays') => {
     if(!date_apres || !date_apres) {
        isCustom.value = false;
        dateRange.value = period
    } else {
        dateRange.value = null
    }
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