<template >
    <div class="tw-p-5">
        <h1 class="tw-mb-3 tw-text-xl tw-font-medium tw-py-2">Total Spend For Each Marketer</h1>
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
        <div v-if="!loading">
            <apexchart :height="400"  :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
</template>
<script setup>
import { computed ,defineProps} from 'vue';

const props = defineProps({
  chartData: Object,
  loading: Boolean

})
var options = computed(() => {

    return {
        series: [...props.chartData.map(i=> ({...i, data: i.data.map(j => j.cost_per_marketer)}))],

        chart: {
            type: 'area',
        },
        xaxis: {
            type: 'category',
            categories: props.chartData[0].data.map(c => c.date), 
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
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    };
});

</script>
<style lang="">
    
</style>