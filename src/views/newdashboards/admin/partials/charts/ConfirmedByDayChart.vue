<template>
    <div v-if="!loading" class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-h-[300px]">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Confirmed</p>
            <p class="tw-px-1 tw-bg-cyan-600 tw-text-white tw-text-sm tw-rounded">{{ new Intl.NumberFormat().format(total)  }}</p>
        </div>
        <apexchart type="area" height="220" :options="options" :series="series"></apexchart>
    </div>
    <div v-if="loading" class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-h-[300px]">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Confirmed</p>
            <p class="tw-px-1 tw-bg-cyan-600 tw-text-white tw-text-sm tw-rounded"><icon icon="eos-icons:three-dots-loading" class="tw-text-xl" /></p>
        </div>
        <div class="tw-h-[230px] tw-w-full tw-bg-gray-100 tw-rounded tw-animate-pulse">
        </div>
    </div>
</template>

<script setup>
import moment from 'moment'
import { ref, computed } from 'vue'
import Analytics from '@/api/Analytics'


const loading = ref(true);
const total = ref(0)

const data = ref([
    

])

const options = computed(() => {

    return {
        chart: {
            id: 'vuechart-example',
            foreColor: "#000",
            toolbar: {
        show: false
        },
        },
        
        xaxis: {
            categories: data.value.map(i => moment(i.date).format('MMM D')),
        },
        yaxis: {
            show: false,
        },
        stroke: {
            colors: ['#0369a1'],
        },
        fill: {
            type: 'gradient',
            colors: ['#06b6d4'],
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [50, 90, 100]
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '10px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                colors: ['#0369a1']
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 2,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                backgroundColor: '#000',
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
        }
    }
}

)

const series = computed(() => [{
    name: 'Orders',
    data: data.value.map(i => i.count),
}])

const getData = async () => {
    loading.value = true;
    await Analytics.confirmedPerDay()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                console.log(data)
                data.value = res.data.data
                total.value = res.data.data.reduce((s, c) => {
                    return s + c.count
                }, 0)
                
            }
        },  
        err => {
            console.log(err)
        }
    )
    loading.value = false;
}

getData()

</script>

<style></style>