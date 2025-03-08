<template>
    <div v-if="!loading" class="tw-bg-white tw-p-4 tw-border tw-border-solid tw-border-gray-200 tw-rounded-lgx tw-shadow-sm">
        <div class="tw-flex tw-items-center tw-gap-4 tw-mb-4">
            <div>
                <h2 class="tw-text-xl tw-font-bold tw-text-gray-800">Confirmation Ranking</h2>
            </div>
            <div class="tw-ml-auto tw-flex tw-items-center tw-gap-4">
                <select v-model="sortOrder" class="tw-bg-gray-100 tw-px-3 tw-py-1 tw-rounded-lg tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500">
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
                <div class="tw-px-3 tw-py-1 tw-bg-blue-100 tw-text-blue-800 tw-rounded-lg tw-text-sm">
                    Avg: {{ averageRate.toFixed(1) }}%
                </div>
            </div>
        </div>
        <apexchart 
            type="bar" 
            height="300" 
            :options="chartOptions" 
            :series="series"
            class="tw-mt-4"
        ></apexchart>
    </div>
    <div v-if="loading" class="tw-bg-white tw-p-2 tw-border tw-border-solid tw-border-gray-200 tw-h-[300px]">
        <div class="tw-flex tw-items-center tw-gap-2">
            <p class="tw-p-2 tw-font-bold tw-text-lg">Confirmation Ranking</p>
            <p class="tw-px-1 tw-bg-black tw-text-white tw-text-sm tw-rounded"><icon icon="eos-icons:three-dots-loading" class="tw-text-xl" /></p>
        </div>
        <div class="tw-h-[230px] tw-w-full tw-bg-gray-100 tw-rounded tw-animate-pulse">
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Dashboard from '@/api/Dashboard'

const loading = ref(true)
const sortOrder = ref('desc')
const rawData = ref([])

// Process data with 'double' exclusion
const processedData = computed(() => {
    const agentMap = new Map()
    
    rawData.value.forEach(entry => {
        if (entry.confirmation === 'double') return
        
        if (!agentMap.has(entry.agente_id)) {
            agentMap.set(entry.agente_id, {
                confirmer: 0,
                total: 0
            })
        }
        
        const agent = agentMap.get(entry.agente_id)
        agent.total += entry.count
        
        if (entry.confirmation === 'confirmer') {
            agent.confirmer += entry.count
        }
    })

    return Array.from(agentMap.entries()).map(([id, stats]) => ({
        agente_id: id,
        fullname: rawData.value.find(entry => entry.agente_id === id)?.fullname || '',
        percentage: stats.total > 0 ? (stats.confirmer / stats.total) * 100 : 0
    }))
})

// Sorted data based on current order
const sortedData = computed(() => {
    return [...processedData.value].sort((a, b) => {
        return sortOrder.value === 'desc' 
            ? b.percentage - a.percentage 
            : a.percentage - b.percentage
    })
})

// Chart options
const chartOptions = computed(() => ({
    chart: {
        type: 'bar',
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
        bar: {
            horizontal: true,
            borderRadius: 4,
            dataLabels: { position: 'center' }
        }
    },
    colors: ['#3B82F6'],
    dataLabels: {
        enabled: true,
        formatter: (val) => `${val.toFixed(1)}%`,
        style: {
            fontSize: '12px',
            colors: ['#fff']
        },
        background: {
            enabled: false
        }
    },
    xaxis: {
        categories: sortedData.value.map(agent => `${agent.fullname}`),
        labels: { style: { colors: '#6B7280', fontSize: '12px' } },
        axisTicks: { show: false },
        axisBorder: { show: false }
    },
    yaxis: {
        labels: { 
            style: { 
                colors: '#6B7280',
                fontSize: '14px',
                fontWeight: 500
            }
        }
    },
    grid: {
        borderColor: '#F3F4F6',
        strokeDashArray: 5,
        xaxis: { lines: { show: true } }
    },
    tooltip: {
        y: { formatter: (val) => `${val.toFixed(1)}%` }
    }
}))

const series = computed(() => [{
    name: 'Confirmation Rate',
    data: sortedData.value.map(agent => agent.percentage)
}])

const averageRate = computed(() => {
    const total = sortedData.value.reduce((sum, agent) => sum + agent.percentage, 0)
    return sortedData.value.length > 0 ? total / sortedData.value.length : 0
})

// Fetch data
const getData = async () => {
    try {
        const res = await Dashboard.agentsByConfirmation()
        if (res.data.code === 'SUCCESS') {
            rawData.value = res.data.data
        }
    } catch (err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}
getData()
// rawData.value = [
//   { "agente_id": 1, "confirmation": null, "count": 2 },
//   { "agente_id": 1, "confirmation": "annuler", "count": 2 },
//   { "agente_id": 1, "confirmation": "confirmer", "count": 16 },
//   { "agente_id": 1, "confirmation": "day-one-call-one", "count": 1 },
//   { "agente_id": 1, "confirmation": "refund", "count": 2 },
//   { "agente_id": 10, "confirmation": "annuler", "count": 3 },
//   { "agente_id": 10, "confirmation": "confirmer", "count": 9 },
//   { "agente_id": 11, "confirmation": "annuler", "count": 4953 },
//   { "agente_id": 11, "confirmation": "change", "count": 49 },
//   { "agente_id": 11, "confirmation": "confirmer", "count": 11319 },
//   { "agente_id": 11, "confirmation": "day-one-call-one", "count": 3 },
//   { "agente_id": 11, "confirmation": "day-one-call-three", "count": 2 },
//   { "agente_id": 11, "confirmation": "day-one-call-two", "count": 121 },
//   { "agente_id": 11, "confirmation": "day-three-call-three", "count": 98 },
//   { "agente_id": 11, "confirmation": "double", "count": 1573 },
//   { "agente_id": 11, "confirmation": "refund", "count": 6 },
//   { "agente_id": 11, "confirmation": "reporter", "count": 28 },
//   { "agente_id": 11, "confirmation": "wrong-number", "count": 1993 },
//   { "agente_id": 12, "confirmation": "annuler", "count": 6513 },
//   { "agente_id": 12, "confirmation": "change", "count": 13 },
//   { "agente_id": 12, "confirmation": "confirmer", "count": 14982 },
//   { "agente_id": 12, "confirmation": "day-one-call-three", "count": 2 },
//   { "agente_id": 12, "confirmation": "day-one-call-two", "count": 1 },
//   { "agente_id": 12, "confirmation": "day-three-call-three", "count": 848 },
//   { "agente_id": 12, "confirmation": "day-two-call-two", "count": 2 }
// ];

// loading.value = false;
</script>