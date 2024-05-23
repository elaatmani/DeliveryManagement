<template >
    <div class="tw-p-5 tw-relative">
        <div class="tw-flex tw-justify-between">
            <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Total Spend For Each Marketer</h1>
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
        <div class="tw-flex">
            <vue-select 
                :multiple="true"
                @input="updateChart" 
                :reduce="(marketer) => marketer.marketer_id" 
                :clearable="false" 
                class="tw-bg-white tw-items-center tw-border-solid tw-outline-none tw-mb-5 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-[200px] tw-h-[44px]"
                v-model="selectedMarketerId" 
                :options="[{ marketer_id: 'all', name: 'All' }, ...marketerOptions]" 
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
import { watch } from 'vue';
import vueSelect from 'vue-select';

import { computed,ref ,defineComponent} from 'vue';

defineComponent({
  components: {
    'vue-select': vueSelect
  },
});
const data = ref([]);
const isCustom = ref(false);
const dateRange = ref('lastsevendays');
const date_avant_field = ref(null);
const date_apres_field = ref(null);

const loading = ref(true);
const loadingUpdating = ref(true);
const selectedMarketerId = ref(null); 
const marketerOptions = computed(() => data.value.map((marketer) => ({ marketer_id: marketer.marketer_id, name: marketer.name })));
const getData = async (date_avant = null, date_apres = null, period = 'lastsevendays', selectedOption = null,marketerId = null) => {
    const cachedData = sessionStorage.getItem('cachedCostPerMarketer');
    let parsedData = null;

    if (cachedData) {
        parsedData = JSON.parse(cachedData);
        if (parsedData.date_avant === date_avant && parsedData.date_apres === date_apres && parsedData.period === period && parsedData.selectedOption === selectedOption) {
            data.value = parsedData.cost_per_marketer;
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

    await Dashboard.CostPerMarketer(date_avant, date_apres, period, marketerId)
        .then(res => {
            if (res.data.code === 'SUCCESS') {
                const newData = {
                    date_avant,
                    date_apres,
                    period,
                    selectedOption,
                    cost_per_marketer: res.data.data.cost_per_marketer,
                    total_cost: res.data.data.total_cost
                };

                if (!parsedData || JSON.stringify(parsedData.cost_per_marketer) !== JSON.stringify(newData.cost_per_marketer) || JSON.stringify(parsedData.total_cost) !== JSON.stringify(newData.total_cost)) {
                    sessionStorage.setItem('cachedCostPerMarketer', JSON.stringify(newData));
                    data.value = res.data.data.cost_per_marketer;
                    loadingUpdating.value = true
                } else {
                    loadingUpdating.value = false;

                }
                loadingUpdating.value = false
                loading.value = false;
                updateChart();

            }
        });
};
const updateChart = () => {
    if (selectedMarketerId.value && selectedMarketerId.value.length > 0 && !selectedMarketerId.value.includes('all')) {
        const filteredData = data.value.filter(item => selectedMarketerId.value.includes(item.marketer_id));
        options.value.series = filteredData.map(i => ({...i, data: i.data.map(j => j.cost_per_marketer)}));
    } else {
        options.value.series = data.value.map(i => ({...i, data: i.data.map(j => j.total_cost)}));
    }
};
watch(selectedMarketerId, () => {
    getData(null, null, null, selectedMarketerId.value);
    updateChart();

});

getData();


var options = computed(() => {

    return {
        series: [...data.value.map(i=> ({...i, data: i.data.map(j => j.cost_per_marketer)}))],

        chart: {
            type: 'area',
        },
        xaxis: {
            type: 'category',
            categories: data.value[0].data.map(c => c.date), 
        },

        theme: {
            palette: 'palette4'
        },
        stroke: {
            curve: 'smooth',
            },
       
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                    formatter: function (value, { seriesIndex, dataPointIndex }) {
                        let marketerValue;
                        let marketerName;
                        if (selectedMarketerId.value && selectedMarketerId.value.length > 0 && !selectedMarketerId.value.includes('all')) {
                            let marketerId = selectedMarketerId.value[seriesIndex];
                            let marketerData = data.value.find(item => item.marketer_id === marketerId);
                            if (marketerData) {
                                marketerValue = marketerData.data.find(item => item.date === options.value.xaxis.categories[dataPointIndex]).cost_per_marketer;
                                marketerName = marketerData.name; // Get the marketer's name
                            }
                        } else {
                            marketerValue = data.value[seriesIndex].data.find(item => item.date === options.value.xaxis.categories[dataPointIndex]).cost_per_marketer;
                            marketerName = data.value[seriesIndex].name; // Get the marketer's name
                        }
                        return `${marketerName}: ${marketerValue}`; // Display the marketer's name along with the value
                    },
                    title: {
                        formatter: () => '',
                    },
                },
        },
        legend: {
            show:false,
            position: 'top',
            horizontalAlign: 'left'
        }
    };
});

</script>
<style lang="">
    
</style>