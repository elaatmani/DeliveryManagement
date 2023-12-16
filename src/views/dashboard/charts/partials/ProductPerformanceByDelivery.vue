<template>
    <div class="tw-p-5">
        <div v-if="!loading">
            <apexchart :height="500" :series="options.series" :chart="options.chart" :options="options"></apexchart>
        </div>
        <div v-else class="tw-h-[500px] tw-flex tw-items-center tw-justify-center">
            <Loading />
        </div>
    </div>
</template>

<script setup>
import Dashboard from '@/api/Dashboard';
import { computed, ref } from 'vue';


const data = ref([]);
const loading = ref(true);
const shippedStatuses = ['expidier', 'transfer'];
const products = computed(() => loading.value ? null : data.value.map(getStatuses))

const getStatuses = product => {
    const statuses = {
        noStatus: 0,
        livrer: 0,
        dispatch: 0,
        shipped: 0,
        annuler: 0,
        retourner: 0,
        others: 0
    };

    Object.keys(product.confirmation_counts)
    .forEach(k => {
        const status = product.confirmation_counts[k];

        if(!k) {
            statuses.noStatus += status;
            return;
        }
        if(k in statuses) {
            statuses[k] += status;
            return;
        }

        if(shippedStatuses.includes(k)) {
            statuses.shipped += status;
            return;
        }

        statuses.others += status;
    });
    return statuses;
}

const getData = async () => {
    loading.value = true;
    await Dashboard.productPerformanceByDelivery()
    .then(
        res => {
            if(res.data.code == 'SUCCESS') {
                data.value = res.data.data.sort((a, b) => {
                    const getCount = (obj) => Object.values(obj).reduce((acc, curr) => acc + curr, 0);

                    const totalA = getCount(a.confirmation_counts);
                    const totalB = getCount(b.confirmation_counts);

                    return totalB - totalA; // Sort in descending order
                });
            }
        }
    );
    loading.value = false;
}

getData();

var options = computed(() => loading.value ? null : ({
    series: [
        {
            name: 'Delivered',
            group: 'actual',
            data: products.value.map(p => p.livrer)
        },
        {
            name: 'Shipped',
            group: 'actual',
            data: products.value.map(p => p.shipped)
        },
        {
            name: 'Dispatched',
            group: 'actual',
            data: products.value.map(p => p.dispatch)
        },
        {
            name: 'Cancelled',
            group: 'actual',
            data: products.value.map(p => p.annuler)
        },
        {
            name: 'Returned',
            group: 'actual',
            data: products.value.map(p => p.retourner)
        },
        {
            name: 'Others',
            group: 'actual',
            data: products.value.map(p => p.others)
        },
        {
            name: 'No Status',
            group: 'actual',
            data: products.value.map(p => p.noStatus)
        },
    ],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    dataLabels: {
        formatter: () => {
            return ''
        }
    },
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    xaxis: {
        categories: data.value.map(p => p.ref),
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

<style></style>